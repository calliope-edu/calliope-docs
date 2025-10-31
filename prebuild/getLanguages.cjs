const fs = require('fs');
const path = require('path');

/**
 * Parses and extracts language keys from store.js
 * This is the single source of truth for supported languages
 * @returns {string[]} Array of language keys (e.g., ['de', 'en'])
 */
function getLanguages() {
  const storePath = path.join(__dirname, '../src/lib/scripts/store.js');
  const storeContent = fs.readFileSync(storePath, 'utf-8');
  
  // Match the languagesMeta export
  const languagesMetaMatch = storeContent.match(/export const languagesMeta = .*?\({([\s\S]*?)\}\)/);
  
  if (!languagesMetaMatch) {
    throw new Error('Could not parse languagesMeta from store.js');
  }
  
  // Extract language keys (e.g., "de", "en") from the object definition
  const languageKeys = [...languagesMetaMatch[1].matchAll(/"([^"]+)":\s*{/g)].map(m => m[1]);
  
  if (languageKeys.length === 0) {
    throw new Error('No languages found in languagesMeta from store.js');
  }
  
  return languageKeys;
}

module.exports = getLanguages;
