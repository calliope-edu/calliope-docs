/**
 * Load environment variables from .env file
 * This module should be imported FIRST before any other modules
 * to ensure environment variables are available
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Only load if MAIN_BRANCH or DEV_BASE_URL are not already set
if (!process.env.MAIN_BRANCH || !process.env.DEV_BASE_URL) {
  try {
    // First preference: helper.config.js at repo root
    const configPath = path.join(__dirname, '..', 'helper.config.js');
    if (fs.existsSync(configPath)) {
      try {
        // dynamic import of ESM config file
        const mod = await import(pathToFileURL(configPath).href);
        
        // Load MAIN_BRANCH
        const mainBranchVal = mod?.MAIN_BRANCH ?? (mod?.default && mod.default.MAIN_BRANCH);
        if (mainBranchVal && !process.env.MAIN_BRANCH) {
          process.env.MAIN_BRANCH = String(mainBranchVal).trim();
        }
        
        // Load DEV_BASE_URL
        const devBaseUrlVal = mod?.DEV_BASE_URL ?? (mod?.default && mod.default.DEV_BASE_URL);
        if (devBaseUrlVal && !process.env.DEV_BASE_URL) {
          process.env.DEV_BASE_URL = String(devBaseUrlVal).trim();
        }
      } catch (e) {
        // ignore import errors and fall back to .env
      }
    }

    // Fallback: read .env in project root
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      
      // Load MAIN_BRANCH from .env if not set
      if (!process.env.MAIN_BRANCH) {
        const mainBranchMatch = envContent.match(/^MAIN_BRANCH=(.+)$/m);
        if (mainBranchMatch) {
          process.env.MAIN_BRANCH = mainBranchMatch[1].trim();
        }
      }
      
      // Load DEV_BASE_URL from .env if not set
      if (!process.env.DEV_BASE_URL) {
        const devBaseUrlMatch = envContent.match(/^DEV_BASE_URL=(.+)$/m);
        if (devBaseUrlMatch) {
          process.env.DEV_BASE_URL = devBaseUrlMatch[1].trim();
        }
      }
    }
  } catch (err) {
    // Silently fail if .env/config file doesn't exist or can't be read
  }
}
