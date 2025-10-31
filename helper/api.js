/**
 * API Endpoints für den Helper
 */

// MUST be imported first to load environment variables
import './load-env.js';

import { projectRoot, executeCommand, getCurrentBranch, getBranches, getEditedFiles, log, checkDependencies, getGitHistory, needsNpmInstall, checkSystemRequirements } from './utils.js';
import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// Configuration: Main branch name (can be 'main', 'master', 'PRODUCTION', etc.)
const MAIN_BRANCH = process.env.MAIN_BRANCH || 'main';

let branchName = '';
let devServerProcess = null;
let devServerPort = 5173;
let devServerStarting = false;
let storybookProcess = null;
let storybookPort = 6006;
let storybookStarting = false;

// Helper: Check if process is still alive
function isProcessAlive(proc) {
  return proc && !proc.killed;
}

export async function handleApiRequest(req, res, url) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // GET /api/system-check - Check system requirements
  if (url === '/api/system-check' && req.method === 'GET') {
    const checks = checkSystemRequirements();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, checks }));
    return;
  }

  // GET /api/check - Check if all dependencies are installed
  if (url === '/api/check' && req.method === 'GET') {
    const check = checkDependencies();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(check));
    return;
  }

  // GET /api/get-branches
  if (url === '/api/get-branches' && req.method === 'GET') {
    const branches = getBranches();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, branches }));
    return;
  }

  // GET /api/git-history
  if (url === '/api/git-history' && req.method === 'GET') {
    const history = getGitHistory();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, ...history }));
    return;
  }

  // GET /api/status
  if (url === '/api/status' && req.method === 'GET') {
    const currentBranch = getCurrentBranch();
    const filesData = getEditedFiles();
    
    // Use the new files array with proper status codes
    const files = filesData.files || [];
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      success: true, 
      currentBranch,
      mainBranch: MAIN_BRANCH,
      files
    }));
    return;
  }

  // POST /api/pull
  if (url === '/api/pull' && req.method === 'POST') {
    const r1 = executeCommand('git fetch origin', 'Fetch');
    const r2 = executeCommand(`git checkout ${MAIN_BRANCH}`, `Checkout ${MAIN_BRANCH}`);
    const r3 = executeCommand(`git pull origin ${MAIN_BRANCH}`, `Pull ${MAIN_BRANCH}`);
    const success = r1.success && r2.success && r3.success;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success, message: success ? 'Updated' : 'Error' }));
    return;
  }

  // POST /api/create-branch
  if (url === '/api/create-branch' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      try {
        const { name } = JSON.parse(body);
        const sanitized = name.toLowerCase().trim().replace(/[^a-z0-9._-]/g, '-');
        branchName = sanitized;
        
        let branchExists = false;
        try {
          execSync(`git rev-parse --verify ${sanitized}`, { stdio: 'ignore', cwd: projectRoot });
          branchExists = true;
        } catch {
          branchExists = false;
        }

        let result;
        if (branchExists) {
          result = executeCommand(`git checkout ${sanitized}`, 'Checkout Branch');
        } else {
          result = executeCommand(`git checkout -b ${sanitized}`, 'Create Branch');
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: result.success, branch: sanitized }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: e.message }));
      }
    });
    return;
  }

  // POST /api/checkout-branch
  if (url === '/api/checkout-branch' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      try {
        const { branch } = JSON.parse(body);
        branchName = branch;
        
        // Always pull updates first
        executeCommand('git fetch origin', 'Fetch updates');
        
        const result = executeCommand(`git checkout ${branch}`, `Checkout ${branch}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: result.success }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: e.message }));
      }
    });
    return;
  }

  // POST /api/npm-install
  if (url === '/api/npm-install' && req.method === 'POST') {
    try {
      // Try to clean npm cache (optional, skip on error)
      try {
        executeCommand('npm cache clean --force', 'Clear npm cache');
      } catch {
        // Ignore cache clean errors
      }
      
      const packageLock = fs.existsSync(path.join(projectRoot, 'package-lock.json'));
      const command = packageLock ? 'npm ci' : 'npm install';
      const result = executeCommand(command, packageLock ? 'npm ci' : 'npm install');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: result.success }));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: e.message }));
    }
    return;
  }

  // POST /api/start-dev
  if (url === '/api/start-dev' && req.method === 'POST') {
    // Prevent multiple dev server instances
    if (isProcessAlive(devServerProcess)) {
      log('Dev server already running', 'info');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, port: devServerPort, ready: true, message: 'Already running' }));
      return;
    }
    
    // Prevent starting multiple times if already in progress
    if (devServerStarting) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, port: devServerPort, ready: false, message: 'Starting...' }));
      return;
    }

    devServerStarting = true;
    // Reset port to default when starting (will be updated when detected)
    devServerPort = 5173;
    
    try {
      // Spawn dev server and capture output
      devServerProcess = spawn('npm', ['run', 'dev'], {
        cwd: projectRoot,
        shell: process.platform === 'win32'
      });
      
      let serverReady = false;
      
      // Listen for "localhost:" in output and extract port
      devServerProcess.stdout.on('data', (data) => {
        const output = data.toString();
        
        // Strip ANSI color codes
        const cleanOutput = output.replace(/\x1b\[[0-9;]*m/g, '');
        
        // Match patterns like "localhost:5173" or "http://localhost:5173"
        // Vite outputs: "➜  Local:   http://localhost:5173/"
        const portMatch = cleanOutput.match(/localhost:(\d+)/);
        if (portMatch) {
          const newPort = parseInt(portMatch[1], 10);
          if (devServerPort !== newPort) {
            devServerPort = newPort;
            log(`Dev server detected on port ${devServerPort}!`, 'success');
          }
          serverReady = true;
        }
      });
      
      devServerProcess.stderr.on('data', (data) => {
        const output = data.toString();
        
        // Strip ANSI color codes
        const cleanOutput = output.replace(/\x1b\[[0-9;]*m/g, '');
        
        const portMatch = cleanOutput.match(/localhost:(\d+)/);
        if (portMatch) {
          const newPort = parseInt(portMatch[1], 10);
          if (devServerPort !== newPort) {
            devServerPort = newPort;
            log(`Dev server detected on port ${devServerPort}!`, 'success');
          }
          serverReady = true;
          log(`Dev server ready on port ${devServerPort}!`, 'success');
        }
      });
      
      log('Dev server spawned, waiting for ready...', 'info');
      
      // Wait up to 30 seconds for server to be ready
      let waited = 0;
      const checkInterval = setInterval(() => {
        waited += 500;
        if (serverReady || waited >= 30000) {
          clearInterval(checkInterval);
          devServerStarting = false;
        }
      }, 500);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, port: devServerPort, ready: false, message: 'Starting...' }));
    } catch (e) {
      log('Failed: ' + e.message, 'error');
      devServerStarting = false;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, ready: false, message: e.message }));
    }
    return;
  }

  // GET /api/dev-server-status - Check if dev server is ready
  if (url === '/api/dev-server-status' && req.method === 'GET') {
    const ready = isProcessAlive(devServerProcess) && !devServerStarting;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ready, starting: devServerStarting, port: devServerPort }));
    return;
  }

  // POST /api/start-storybook
  if (url === '/api/start-storybook' && req.method === 'POST') {
    // Prevent multiple storybook instances
    if (isProcessAlive(storybookProcess)) {
      log('Storybook already running', 'info');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, port: storybookPort, ready: true, message: 'Already running' }));
      return;
    }
    
    // Prevent starting multiple times if already in progress
    if (storybookStarting) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, port: storybookPort, ready: false, message: 'Starting...' }));
      return;
    }

    storybookStarting = true;
    try {
      // Spawn storybook and capture output
      storybookProcess = spawn('npm', ['run', 'storybook'], {
        cwd: projectRoot,
        shell: process.platform === 'win32'
      });
      
      let serverReady = false;
      
      // Listen for "localhost:" in output and extract port
      storybookProcess.stdout.on('data', (data) => {
        const output = data.toString();
        
        // Strip ANSI color codes
        const cleanOutput = output.replace(/\x1b\[[0-9;]*m/g, '');
        
        // Match patterns like "localhost:6006" or "http://localhost:6006"
        const portMatch = cleanOutput.match(/localhost:(\d+)/);
        if (portMatch) {
          const newPort = parseInt(portMatch[1], 10);
          if (storybookPort !== newPort) {
            storybookPort = newPort;
            log(`Storybook detected on port ${storybookPort}!`, 'success');
          }
          serverReady = true;
        }
      });
      
      storybookProcess.stderr.on('data', (data) => {
        const output = data.toString();
        
        // Strip ANSI color codes
        const cleanOutput = output.replace(/\x1b\[[0-9;]*m/g, '');
        
        const portMatch = cleanOutput.match(/localhost:(\d+)/);
        if (portMatch) {
          const newPort = parseInt(portMatch[1], 10);
          if (storybookPort !== newPort) {
            storybookPort = newPort;
            log(`Storybook detected on port ${storybookPort}!`, 'success');
          }
          serverReady = true;
        }
      });
      
      log('Storybook spawned, waiting for ready...', 'info');
      
      // Wait up to 30 seconds for storybook to be ready
      let waited = 0;
      const checkInterval = setInterval(() => {
        waited += 500;
        if (serverReady || waited >= 30000) {
          clearInterval(checkInterval);
          storybookStarting = false;
        }
      }, 500);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, port: storybookPort, ready: false, message: 'Starting...' }));
    } catch (e) {
      log('Failed: ' + e.message, 'error');
      storybookStarting = false;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, ready: false, message: e.message }));
    }
    return;
  }

  // GET /api/storybook-status - Check if storybook is ready
  if (url === '/api/storybook-status' && req.method === 'GET') {
    const ready = isProcessAlive(storybookProcess) && !storybookStarting;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ready, starting: storybookStarting, port: storybookPort }));
    return;
  }

  // POST /api/stop-dev - Stop the dev server
  if (url === '/api/stop-dev' && req.method === 'POST') {
    if (devServerProcess && isProcessAlive(devServerProcess)) {
      try {
        devServerProcess.kill();
        devServerProcess = null;
        log('Dev server stopped', 'info');
      } catch (e) {
        log(`Error stopping dev server: ${e.message}`, 'error');
      }
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    return;
  }

  // POST /api/shutdown - Shutdown the entire helper
  if (url === '/api/shutdown' && req.method === 'POST') {
    log('Shutting down helper...', 'info');
    
    // Stop dev server first
    if (devServerProcess && isProcessAlive(devServerProcess)) {
      try {
        devServerProcess.kill();
        log('Dev server stopped', 'info');
      } catch (e) {
        log(`Error stopping dev server: ${e.message}`, 'error');
      }
    }
    
    // Stop storybook
    if (storybookProcess && isProcessAlive(storybookProcess)) {
      try {
        storybookProcess.kill();
        log('Storybook stopped', 'info');
      } catch (e) {
        log(`Error stopping storybook: ${e.message}`, 'error');
      }
    }
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true }));
    
    // Give time for response to be sent, then exit
    setTimeout(() => {
      log('Helper shutdown complete', 'success');
      process.exit(0);
    }, 500);
    return;
  }

  // POST /api/commit-only
  if (url === '/api/commit-only' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      try {
        const { message } = JSON.parse(body);
        
        // Get current branch
        const currentBranch = getCurrentBranch();
        
        const r1 = executeCommand('git add .', 'Add');
        const r2 = executeCommand(`git commit -m "${message || 'Update'}"`, 'Commit');
        const r3 = executeCommand(`git push origin ${currentBranch}`, 'Push');
        const success = r1.success && r2.success && r3.success;
        
        // Generate preview URL based on branch name
        const DEV_BASE_URL = process.env.DEV_BASE_URL || 'website-tinysuperlab.pages.dev';
        const previewUrl = `https://${currentBranch}.${DEV_BASE_URL}`;
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success, previewUrl }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: e.message }));
      }
    });
    return;
  }

  // POST /api/merge
  if (url === '/api/merge' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      try {
        const { message } = JSON.parse(body);
        const r1 = executeCommand(`git checkout ${MAIN_BRANCH}`, `Checkout ${MAIN_BRANCH}`);
        const r2 = executeCommand(`git pull origin ${MAIN_BRANCH}`, `Pull ${MAIN_BRANCH}`);
        const r3 = executeCommand(`git merge ${branchName}`, 'Merge');
        const r4 = executeCommand(`git push origin ${MAIN_BRANCH}`, `Push ${MAIN_BRANCH}`);
        const r5 = executeCommand(`git branch -d ${branchName}`, 'Delete branch');
        const success = r1.success && r2.success && r3.success && r4.success;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: e.message }));
      }
    });
    return;
  }

  // GET /api/check-node-modules
  if (url === '/api/check-node-modules' && req.method === 'GET') {
    const status = needsNpmInstall();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(status));
    return;
  }

  // POST /api/open-vscode-folder
  if (url === '/api/open-vscode-folder' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      try {
        const { path: folderPath } = JSON.parse(body);
        const fullPath = path.join(projectRoot, folderPath);
        executeCommand(`code "${fullPath}"`, 'Open in VS Code');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: e.message }));
      }
    });
    return;
  }

  // POST /api/open-vscode-file
  if (url === '/api/open-vscode-file' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      try {
        const { path: filePath } = JSON.parse(body);
        const fullPath = path.join(projectRoot, filePath);
        executeCommand(`code "${fullPath}"`, 'Open file in VS Code');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: e.message }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not found');
}

export function getBranchName() {
  return branchName;
}

export function setBranchName(name) {
  branchName = name;
}
