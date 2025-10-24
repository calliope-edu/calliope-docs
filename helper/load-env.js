/**
 * Load environment variables from .env file
 * This module should be imported FIRST before any other modules
 * to ensure environment variables are available
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Only load if MAIN_BRANCH is not already set
if (!process.env.MAIN_BRANCH) {
  try {
    const envPath = path.join(__dirname, '..', '.env');
    
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf-8');
      const match = envContent.match(/^MAIN_BRANCH=(.+)$/m);
      
      if (match) {
        process.env.MAIN_BRANCH = match[1].trim();
      }
    }
  } catch (err) {
    // Silently fail if .env file doesn't exist or can't be read
  }
}
