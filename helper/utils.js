/**
 * Utility Funktionen für Git und System
 */

// MUST be imported first to load environment variables
import './load-env.js';

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration: Main branch name (can be 'main', 'master', 'PRODUCTION', etc.)
const MAIN_BRANCH = process.env.MAIN_BRANCH || 'main';
export const projectRoot = path.join(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

export function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString('de-DE');
  const colorCode = {
    info: colors.cyan,
    success: colors.green,
    error: colors.red,
    warning: colors.yellow,
  }[type] || colors.reset;

  const logEntry = `[${timestamp}] ${message}`;
  console.log(`${colorCode}${logEntry}${colors.reset}`);
}

// Check system requirements
export function checkSystemRequirements() {
  const checks = {
    node: false,
    npm: false,
    git: false,
    nodeVersion: null,
    npmVersion: null,
    gitVersion: null,
  };

  // Check Node.js
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf-8' }).trim();
    checks.node = true;
    checks.nodeVersion = nodeVersion;
  } catch (error) {
    checks.node = false;
  }

  // Check npm
  try {
    const npmVersion = execSync('npm --version', { encoding: 'utf-8' }).trim();
    checks.npm = true;
    checks.npmVersion = npmVersion;
  } catch (error) {
    checks.npm = false;
  }

  // Check Git
  try {
    const gitVersion = execSync('git --version', { encoding: 'utf-8' }).trim();
    checks.git = true;
    checks.gitVersion = gitVersion;
  } catch (error) {
    checks.git = false;
  }

  return checks;
}

export function executeCommand(command, description) {
  try {
    log(`Running: ${description}...`, 'info');
    const output = execSync(command, { encoding: 'utf-8', cwd: projectRoot });
    log(`✓ ${description}`, 'success');
    return { success: true, output };
  } catch (error) {
    log(`✗ ${description}: ${error.message}`, 'error');
    return { success: false, error: error.message };
  }
}

export function getCurrentBranch() {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8',
      cwd: projectRoot,
    }).trim();
  } catch {
    return null;
  }
}

export function getBranches() {
  try {
    const branches = execSync('git branch -r', { encoding: 'utf-8', cwd: projectRoot })
      .split('\n')
      .filter((b) => b.includes('origin/') && !b.includes('HEAD'))
      .map((b) => b.trim().replace('origin/', ''))
      .filter((b) => b !== MAIN_BRANCH && b !== '')
      .sort();
    return branches;
  } catch {
    return [];
  }
}

export function getGitHistory() {
  try {
    // Get all branches with their commits
    const allBranches = execSync('git branch -r', { encoding: 'utf-8', cwd: projectRoot })
      .split('\n')
      .filter((b) => b.includes('origin/') && !b.includes('HEAD'))
      .map((b) => b.trim().replace('origin/', ''));

    // Get commit graph for all branches
    const logFormat = '%H|%h|%P|%an|%ar|%s|%D';
    const gitLog = execSync(
      `git log --all --graph --date-order --format="${logFormat}" --max-count=50`,
      { encoding: 'utf-8', cwd: projectRoot }
    );

    const lines = gitLog.split('\n').filter(l => l.trim());
    const commits = [];
    
    for (const line of lines) {
      // Extract graph characters and commit data
      const match = line.match(/^([*|\/\\ ]+)(.+)$/);
      if (!match) continue;
      
      const graphPart = match[1];
      const dataPart = match[2];
      
      const parts = dataPart.split('|');
      if (parts.length < 6) continue;
      
      const [hash, shortHash, parents, author, time, message, refs] = parts;
      
      // Parse which branches this commit belongs to
      const branchRefs = refs ? refs.split(',')
        .map(r => r.trim())
        .filter(r => r.startsWith('origin/'))
        .map(r => r.replace('origin/', ''))
        : [];
      
      commits.push({
        hash: hash.trim(),
        shortHash: shortHash.trim(),
        parents: parents.trim().split(' ').filter(p => p),
        author: author.trim(),
        time: time.trim(),
        message: message.trim(),
        branches: branchRefs,
        graphIndent: graphPart.length
      });
    }

    // Build branch structure
    const branchData = allBranches.map(branch => {
      // Get the latest commit for this branch
      const branchCommit = execSync(
        `git rev-parse origin/${branch}`,
        { encoding: 'utf-8', cwd: projectRoot }
      ).trim();
      
      // Find merge base with main branch
      let mergeBase = null;
      try {
        mergeBase = execSync(
          `git merge-base origin/${MAIN_BRANCH} origin/${branch}`,
          { encoding: 'utf-8', cwd: projectRoot }
        ).trim();
      } catch {}
      
      // Get commit details
      const commitInfo = commits.find(c => c.hash === branchCommit) || null;
      const baseCommit = commits.find(c => c.hash === mergeBase) || null;
      
      return {
        name: branch,
        currentCommit: branchCommit,
        commitInfo,
        mergeBase,
        baseCommit
      };
    });

    return {
      branches: branchData,
      commits: commits.slice(0, 20) // Last 20 commits
    };
  } catch (e) {
    log(`Git history error: ${e.message}`, 'error');
    return { branches: [], commits: [] };
  }
}

export function getEditedFiles() {
  try {
    // Use git status --porcelain to get file status codes
    const statusOutput = execSync('git status --porcelain', { 
      encoding: 'utf-8', 
      cwd: projectRoot 
    });

    const files = [];
    const lines = statusOutput.split('\n').filter(l => l.trim() !== '');
    
    for (const line of lines) {
      // Format: XY filename
      // X = staged status, Y = unstaged status
      const statusCode = line.substring(0, 2);
      const filename = line.substring(3);
      
      let status = 'M'; // Modified (default)
      
      // Parse status codes
      // First character = staged, second = unstaged
      const staged = statusCode[0];
      const unstaged = statusCode[1];
      
      // Determine the status
      if (staged === 'D' || unstaged === 'D') {
        status = 'D'; // Deleted
      } else if (staged === 'A' || unstaged === 'A' || statusCode === '??') {
        status = 'A'; // Added/New
      } else if (staged === 'R' || unstaged === 'R') {
        status = 'R'; // Renamed
      } else if (staged === 'M' || unstaged === 'M') {
        status = 'M'; // Modified
      }
      
      files.push({ path: filename, status });
    }

    // Legacy compatibility - separate into categories
    const modified = files.filter(f => f.status === 'M').map(f => f.path);
    const staged = files.filter(f => ['A', 'M', 'D', 'R'].includes(f.status)).map(f => f.path);
    const untracked = files.filter(f => f.status === 'A').map(f => f.path);
    const all = files.map(f => f.path);

    return { modified, staged, untracked, all, files };
  } catch {
    return { modified: [], staged: [], untracked: [], all: [], files: [] };
  }
}

export function needsNpmInstall() {
  try {
    const nodeModulesPath = path.join(projectRoot, 'node_modules');
    const packageLockPath = path.join(projectRoot, 'package-lock.json');
    
    // Check if node_modules exists
    if (!fs.existsSync(nodeModulesPath)) {
      return { needed: true, reason: 'missing', message: 'node_modules Ordner nicht gefunden' };
    }
    
    // Check if package-lock.json exists
    if (!fs.existsSync(packageLockPath)) {
      return { needed: false, reason: 'no-lock', message: 'Keine package-lock.json gefunden, aber node_modules existiert' };
    }
    
    // Compare modification times
    const nodeModulesStat = fs.statSync(nodeModulesPath);
    const packageLockStat = fs.statSync(packageLockPath);
    
    const nodeModulesTime = nodeModulesStat.mtime;
    const packageLockTime = packageLockStat.mtime;
    
    // If package-lock is newer than node_modules, might need reinstall
    if (packageLockTime > nodeModulesTime) {
      const timeDiff = packageLockTime - nodeModulesTime;
      const minutesDiff = Math.floor(timeDiff / 1000 / 60);
      
      return { 
        needed: true, 
        reason: 'outdated', 
        message: `package-lock.json wurde vor ${minutesDiff} Minute(n) geändert, node_modules ist veraltet`,
        minutesDiff
      };
    }
    
    // Calculate how long ago node_modules was created/modified
    const now = new Date();
    const ageMs = now - nodeModulesTime;
    const ageMinutes = Math.floor(ageMs / 1000 / 60);
    const ageHours = Math.floor(ageMinutes / 60);
    const ageDays = Math.floor(ageHours / 24);
    
    let ageText = '';
    if (ageDays > 0) {
      ageText = `vor ${ageDays} Tag(en)`;
    } else if (ageHours > 0) {
      ageText = `vor ${ageHours} Stunde(n)`;
    } else if (ageMinutes > 0) {
      ageText = `vor ${ageMinutes} Minute(n)`;
    } else {
      ageText = 'gerade eben';
    }
    
    return { 
      needed: false, 
      reason: 'uptodate', 
      message: `node_modules existiert und ist aktuell (${ageText} installiert)`,
      age: ageText
    };
  } catch (e) {
    return { needed: true, reason: 'error', message: `Fehler bei Prüfung: ${e.message}` };
  }
}

export function checkDependencies() {
  const missing = [];
  
  // Check Node.js
  try {
    execSync('node --version', { stdio: 'ignore' });
  } catch {
    missing.push('Node.js');
  }
  
  // Check npm
  try {
    execSync('npm --version', { stdio: 'ignore' });
  } catch {
    missing.push('npm');
  }
  
  // Check git
  try {
    execSync('git --version', { stdio: 'ignore' });
  } catch {
    missing.push('git');
  }
  
  return {
    ok: missing.length === 0,
    missing,
    message: missing.length === 0 
      ? 'All dependencies found' 
      : `Missing: ${missing.join(', ')}. Please install them first.`
  };
}

export function findAvailablePort(startPort = 8080) {
  return new Promise(async (resolve) => {
    const http = await import('http');
    const testServer = http.default.createServer();
    testServer.once('error', (err) => {
      if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
        log('Port ' + startPort + ' taken, trying ' + (startPort + 1), 'info');
        testServer.close();
        resolve(findAvailablePort(startPort + 1));
      }
    });
    testServer.once('listening', () => {
      testServer.close(() => {
        resolve(startPort);
      });
    });
    testServer.listen(startPort, '127.0.0.1');
  });
}
