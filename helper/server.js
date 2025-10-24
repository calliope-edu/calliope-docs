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
import { log, findAvailablePort } from './utils.js';
import { handleApiRequest } from './api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.join(__dirname, 'index.html');

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
