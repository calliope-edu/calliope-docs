const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');
const getLanguages = require('./getLanguages.cjs');

// Directories
const CONTENT_DIR = 'src/content';
const OUTPUT_FILE = 'src/sitemap.js';
const LANGUAGES = getLanguages(); // Load languages from store.js

// Helper function to get slug from file path
function slugFromPath(filePath) {
  return filePath
    .replace(/\\/g, '/')
    .replace(/(src\/|content\/)/g, '')
    .replace(/\.(de|en)\.page$/, '')
    .replace(/\.page$/, '')
    .replace(/\/index$/, '')
    .replace(/^\/?(.+)\/?$/, '$1');
}

// Function to remove prefix pattern from names
function cleanFolderName(name) {
  // Remove patterns like [...01], [!...01], etc.
  return name.replace(/^!?\[\.\.\.[\d]+\]/g, '');
}

// Clean each part of a path
// function cleanPath(pathString) {
//   return pathString.split('/').map(cleanFolderName).join('/');
// }

function generateSitemap() {
  // The structure we'll export
  const sitemap = {};
  
  // Get all directories with .page files
  const contentDirs = new Set();
  const allPageFiles = glob.sync(`${CONTENT_DIR}/**/*.page`);
  
  allPageFiles.forEach(file => {
    const relativePath = path.relative(CONTENT_DIR, file);
    const parts = relativePath.split(path.sep);
    if (parts.length > 1) {
      // Store the top-level directory
      contentDirs.add(parts[0]);
    }
  });

  // Process each content directory separately
  contentDirs.forEach(contentType => {
    console.log(`Processing content type: ${contentType}`);
    
    // Process all content files for each language
    LANGUAGES.forEach(lang => {
      // Initialize language in sitemap if not exists
      if (!sitemap[lang]) {
        sitemap[lang] = {};
      }
      
      // Initialize content type in language if not exists
      if (!sitemap[lang][contentType]) {
        sitemap[lang][contentType] = {
          mainCategories: [],
          paths: {}
        };
      }
      
      // Get all page files for this content type (.page, .de.page, .en.page)
      const contentFiles = glob.sync(`${CONTENT_DIR}/${contentType}/**/{[!index]*,*/index}.{page,${lang}.page}`).filter(filePath => !filePath.includes('!'));

      // Group files by their base path (without language suffix)
      const filesByBasePath = {};
      contentFiles.forEach(filePath => {
        const pathWithoutLang = filePath.replace(new RegExp(`\\.${lang}\\.page$`), '.page');
        const basePathKey = pathWithoutLang;
        
        if (!filesByBasePath[basePathKey]) {
          filesByBasePath[basePathKey] = [];
        }
        filesByBasePath[basePathKey].push(filePath);
      });

      // Select the appropriate file for each base path (prioritize language-specific files)
      const selectedFiles = {};
      Object.entries(filesByBasePath).forEach(([basePath, files]) => {
        // Look for language-specific file first - identical logic to your API route
        const langSpecificFile = files.find(f => f.endsWith(`.${lang}.page`));
        
        if (langSpecificFile) {
          selectedFiles[basePath] = langSpecificFile;
        } else {
          // Fall back to default file
          const defaultFile = files.find(f => !f.match(/\.(de|en)\.page$/));
          if (defaultFile) {
            selectedFiles[basePath] = defaultFile;
          }
        }
      });

      // Process files to build content structure
      const categories = new Map(); // Map of category path -> category data
      
      Object.entries(selectedFiles).forEach(([basePath, filePath]) => {
        // Read metadata
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data: metadata } = matter(content);
        
        // Skip unpublished
        if (metadata.published === false) return;
        
        const slug = slugFromPath(filePath);
        const pathParts = slug.split('/');
        
        if (pathParts.length < 1) return;
        
        // Clean all path segments
        const cleanPathParts = pathParts.map(cleanFolderName);
        const cleanSlug = cleanPathParts.join('/');
        
        // Build hierarchy
        let currentPath = '';
        let currentCleanPath = '';
        
        // Process each level in the path
        for (let i = 0; i < pathParts.length; i++) {
          const isLeafNode = i === pathParts.length - 1;
          
          const currentPathParts = pathParts.slice(0, i + 1);
          currentPath = currentPathParts.join('/');
          
          const currentCleanPathParts = cleanPathParts.slice(0, i + 1);
          currentCleanPath = currentCleanPathParts.join('/');
          
          if (!categories.has(currentCleanPath)) {
            // Create new category entry
            categories.set(currentCleanPath, {
              slug: currentCleanPath,
              title: metadata.title || (cleanPathParts[i]?.charAt(0).toUpperCase() + cleanPathParts[i]?.slice(1)),
              subpages: []
            });
          }
          
          // If this is a leaf node (actual page), update its metadata
          if (isLeafNode) {
            const category = categories.get(currentCleanPath);
            // Include ALL metadata fields from frontmatter
            const pageMetadata = { 
              slug: currentCleanPath,
              ...metadata // Include all frontmatter fields
            };
            
            // Ensure title is set
            if (!pageMetadata.title) {
              pageMetadata.title = cleanPathParts[i]?.charAt(0).toUpperCase() + cleanPathParts[i]?.slice(1);
            }
            
            // Update category with complete metadata
            Object.assign(category, pageMetadata);
          }
          
          // Add as subpage to parent (if not root)
          if (i > 0) {
            const parentCleanPath = currentCleanPathParts.slice(0, i).join('/');
            if (categories.has(parentCleanPath)) {
              const parentCategory = categories.get(parentCleanPath);
              
              // Check if this path already exists in parent's subpages
              const existingIndex = parentCategory.subpages.findIndex(p => p.slug === currentCleanPath);
              
              if (existingIndex === -1) {
                // Add as subpage with all metadata
                parentCategory.subpages.push({
                  slug: currentCleanPath,
                  title: categories.get(currentCleanPath).title,
                  ...metadata // Include all frontmatter fields
                });
              } else if (isLeafNode) {
                // Update existing entry with complete metadata
                parentCategory.subpages[existingIndex] = {
                  slug: currentCleanPath,
                  ...metadata, // Include all frontmatter fields
                  title: metadata.title || parentCategory.subpages[existingIndex].title
                };
              }
            }
          }
        }
      });
      
      // Now add all categories and paths to the sitemap
      for (const [categoryPath, category] of categories) {
        const pathParts = categoryPath.split('/');
        
        // If this is a root category, add to main categories
        if (pathParts.length === 2 && pathParts[0] === contentType) {
          sitemap[lang][contentType].mainCategories.push({
            slug: category.slug,
            title: category.title,
            ...category // Include any other metadata fields
          });
        }
        
        // Add every path with its subpages
        sitemap[lang][contentType].paths[categoryPath] = {
          ...category,
          subpages: category.subpages || []
        };
      }
      
      // Reverse order subpages to maintain consistent ordering
      sitemap[lang][contentType].mainCategories.reverse();
      
      for (const path in sitemap[lang][contentType].paths) {
        if (sitemap[lang][contentType].paths[path].subpages) {
          sitemap[lang][contentType].paths[path].subpages.reverse();
        }
      }
    });
  });
  
  // Generate JavaScript file with exported sitemap
  const jsContent = `// This file is auto-generated. Do not edit directly.

const sitemap = ${JSON.stringify(sitemap, null, 2)};

export default sitemap;

// Helper functions for accessing the sitemap
export function getContentTypes(lang = 'de') {
  return Object.keys(sitemap[lang] || {});
}

export function getCategories(contentType, lang = 'de') {
  return sitemap[lang]?.[contentType]?.mainCategories || [];
}

export function getSubpages(path, lang = 'de') {
  const contentType = path.split('/')[0];
  return sitemap[lang]?.[contentType]?.paths?.[path]?.subpages || [];
}

export function getPage(path, lang = 'de') {
  const contentType = path.split('/')[0];
  return sitemap[lang]?.[contentType]?.paths?.[path] || null;
}
`;

  // Ensure the output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the file
  fs.writeFileSync(OUTPUT_FILE, jsContent);
  
  console.log(`Generated sitemap at ${OUTPUT_FILE}`);
}

generateSitemap();