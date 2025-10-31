#!/usr/bin/env node

/**
 * Development Helper - Clean, Modern UI
 * Main server entry point
 */

// MUST be imported first to load environment variables
import './load-env.js';

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { log, findAvailablePort, projectRoot } from './utils.js';
import { handleApiRequest } from './api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.join(__dirname, 'index.html');

// Ensure GitHub CLI is installed and the user is authenticated.
// Tries to install on Windows via winget or chocolatey when possible.
async function ensureGithubAuth() {
  try {
    // Quick check: if the repo has a git remote and git push (dry-run) succeeds,
    // we already have push-capable auth and do not need to run gh.
    try {
      const gitDir = path.join(projectRoot, '.git');
      if (fs.existsSync(gitDir)) {
        // Ensure remote 'origin' exists
        try {
          execSync('git remote get-url origin', { cwd: projectRoot, stdio: 'ignore' });
          // Fetch first to ensure remote refs are up to date
          try {
            execSync('git fetch origin', { cwd: projectRoot, stdio: 'ignore' });
          } catch {}

          // Determine current branch
          let currentBranch = 'HEAD';
          try {
            currentBranch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: projectRoot, encoding: 'utf-8' }).trim();
          } catch {}

          // Check if local branch is behind remote
          try {
            const counts = execSync(
              `git rev-list --left-right --count origin/${currentBranch}...${currentBranch}`,
              { cwd: projectRoot, encoding: 'utf-8' }
            ).trim();
            const [originOnlyStr, localOnlyStr] = counts.split(/\s+/);
            const originOnly = parseInt(originOnlyStr || '0', 10);
            if (originOnly > 0) {
              // Local is behind remote; try a safe fast-forward pull
              try {
                execSync(`git pull --ff-only origin ${currentBranch}`, { cwd: projectRoot, stdio: 'inherit' });
                log('Local branch fast-forwarded with origin; continuing git auth check.', 'info');
              } catch (pullErr) {
                log('Local branch is behind remote and automatic fast-forward pull failed; skipping git-based auth check.', 'warning');
                // Skip git push dry-run and fall through to gh flow
                throw new Error('behind');
              }
            }
          } catch (e) {
            // If we cannot determine or fast-forward, fall through to gh checks
            if (e.message === 'behind') throw e;
          }

          // Try a dry-run push for current HEAD to origin (harmless)
          try {
            execSync('git push --dry-run origin HEAD', { cwd: projectRoot, stdio: 'ignore' });
            log('Git push dry-run succeeded — existing Git authentication available. Skipping gh auth.', 'success');
            return;
          } catch (pushErr) {
            // push dry-run failed — fall through to gh checks
          }
        } catch (remoteErr) {
          // No origin remote configured or earlier flow triggered a skip — fall through
        }
      }
    } catch (e) {
      // ignore git-check errors and continue with gh flow
    }
    // Check if gh is available
    let ghAvailable = true;
    try {
      execSync('gh --version', { stdio: 'ignore' });
    } catch (e) {
      ghAvailable = false;
    }

    if (!ghAvailable) {
      log('GitHub CLI (gh) not found. Attempting automatic install...', 'warning');
      // Try winget (Windows), then chocolatey as fallback
      if (process.platform === 'win32') {
        try {
          // winget may require interactive permissions; try best-effort
          execSync('winget install --id GitHub.cli -e --accept-package-agreements --accept-source-agreements', { stdio: 'inherit' });
          ghAvailable = true;
          log('Installed GitHub CLI using winget', 'success');
        } catch (e1) {
          try {
            execSync('choco install gh -y', { stdio: 'inherit' });
            ghAvailable = true;
            log('Installed GitHub CLI using chocolatey', 'success');
          } catch (e2) {
            log('Automatic installation of gh failed. Please install GitHub CLI manually from https://github.com/cli/cli', 'error');
          }
        }
      } else if (process.platform === 'darwin') {
        // Try Homebrew on macOS
        try {
          try {
            execSync('brew --version', { stdio: 'ignore' });
          } catch (brewErr) {
            log('Homebrew not found. Please install Homebrew: https://brew.sh', 'warning');
            throw brewErr;
          }

          execSync('brew install gh', { stdio: 'inherit' });
          ghAvailable = true;
          log('Installed GitHub CLI using Homebrew', 'success');
        } catch (e) {
          log('Automatic installation of gh via Homebrew failed or Homebrew is not available. Please install GitHub CLI manually: https://github.com/cli/cli', 'error');
        }
      } else {
        // Linux and other platforms: instruct the user
        log('Please install GitHub CLI (gh): https://github.com/cli/cli#installation', 'warning');
      }
    }

    if (!ghAvailable) return;

    // Check auth status
    try {
      const status = execSync('gh auth status --hostname github.com', { encoding: 'utf-8' });
      if (status.includes('Logged in as')) {
        log('GitHub CLI: already authenticated.', 'success');
        return;
      }
    } catch (e) {
      // Not authenticated or gh returned non-zero
    }

    // Launch interactive auth flow (web + clipboard)
    try {
      log('Starting `gh auth login --web --clipboard` to authenticate with GitHub. Follow the browser steps.', 'info');
      execSync('gh auth login --web --clipboard', { stdio: 'inherit' });
      log('GitHub authentication flow finished (check output for success).', 'success');
    } catch (e) {
      log('`gh auth login` did not complete successfully or was cancelled by the user.', 'error');
    }
  } catch (e) {
    log(`ensureGithubAuth error: ${e.message}`, 'error');
  }
}

// Run auth check before starting the server
await ensureGithubAuth();

// HTTP Server
const server = http.createServer(async (req, res) => {
  const url = req.url;

  // Serve index.html
  if (url === '/' && req.method === 'GET') {
    try {
      const html = fs.readFileSync(indexPath, 'utf-8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(html);
    } catch (e) {
      res.writeHead(500);
      res.end('Error loading UI');
    }
    return;
  }

  // Handle API requests
  if (url.startsWith('/api/')) {
    await handleApiRequest(req, res, url);
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

// Start server
findAvailablePort(8080).then((PORT) => {
  server.listen(PORT, '127.0.0.1', () => {
    log(`Development Helper ready on http://localhost:${PORT}`, 'success');
    log('Open this URL in your browser', 'info');
    
    if (PORT !== 8080) {
      log(`Port 8080 was taken, using ${PORT}`, 'info');
    }

    // Auto-open browser - prefer Chrome-based browsers
    if (process.platform === 'darwin') {
      setTimeout(() => {
        try {
          // Try Chrome first, then Edge, then default
          try {
            execSync(`open -a "Google Chrome" http://localhost:${PORT}`);
            log('Opening in Chrome...', 'info');
          } catch {
            try {
              execSync(`open -a "Microsoft Edge" http://localhost:${PORT}`);
              log('Opening in Edge...', 'info');
            } catch {
              execSync(`open http://localhost:${PORT}`);
              log('Opening browser...', 'info');
            }
          }
        } catch {}
      }, 300);
    } else if (process.platform === 'win32') {
      setTimeout(() => {
        try {
          // Try Chrome first, then Edge, then default
          try {
            execSync('start chrome http://localhost:' + PORT);
            log('Opening in Chrome...', 'info');
          } catch {
            try {
              execSync('start msedge http://localhost:' + PORT);
              log('Opening in Edge...', 'info');
            } catch {
              execSync(`start http://localhost:${PORT}`);
              log('Opening browser...', 'info');
            }
          }
        } catch {}
      }, 300);
    } else {
      // Linux
      setTimeout(() => {
        try {
          // Try Chrome, then Firefox, then default
          try {
            execSync(`google-chrome http://localhost:${PORT}`);
            log('Opening in Chrome...', 'info');
          } catch {
            try {
              execSync(`firefox http://localhost:${PORT}`);
              log('Opening in Firefox...', 'info');
            } catch {
              execSync(`xdg-open http://localhost:${PORT}`);
              log('Opening browser...', 'info');
            }
          }
        } catch {}
      }, 300);
    }
  });

  server.on('error', (err) => {
    log(`Server error: ${err.message}`, 'error');
    process.exit(1);
  });
});

process.on('SIGINT', () => {
  log('Stopping...', 'info');
  process.exit(0);
});

// Keep process alive
setInterval(() => {}, 60000);
