import { visit } from "unist-util-visit";
import toCamel from "just-camel-case";
import exifParser from "fast-exif";
import { glob } from "glob";
import path from "path";  // Add this line

const defaultWidth = 728;
const defaultHeight = "auto";

const RE_SCRIPT_START = /<script(?:\s+?[a-zA-Z]+(=(?:["']){0,1}[a-zA-Z0-9]+(?:["']){0,1}){0,1})*\s*?>/;
const RE_SRC = /src\s*=\s*"(.+?)"/;

export default function relativeImages() {
  return async (tree, file) => {
    const promises = [];

    const urls = new Map();
    const wildcardUrls = new Map();
    const urlCount = new Map();
    const folder = file.filename.substring(0, file.filename.lastIndexOf("/"));

    visit(tree, ["image", "definition"], async (node) => {
      node.url = await transformUrl(node.url);
    });

    visit(tree, "html", async (node) => {
      const isSupportedElement = node.value && node.value.match(/^<(img|video)\b/);

      if (isSupportedElement) {
        const [, url] = node.value.match(RE_SRC) ?? [];
        if (url) {
          const transformed = await transformUrl(url);
          node.value = node.value.replace(`"${url}"`, transformed);
        }
      }
    });

    await Promise.all(promises);

    let scripts = generateScripts(urls, wildcardUrls);
    // console.log('scripts',scripts)

    let isScriptPresent = false;

    visit(tree, "html", (node) => {
      if (RE_SCRIPT_START.test(node.value)) {
        isScriptPresent = true;
        node.value = node.value.replace(RE_SCRIPT_START, (script) => `${script}\n${scripts}`);
      }
    });

    if (!isScriptPresent) {
      tree.children.push({
        type: "html",
        value: `<script>\n${scripts}</script>`,
      });
    }

    return null;

    async function loadExifData(filePath) {
      const exif = await exifParser.read(filePath);
      return exif?.image;
    }

    async function transformUrl(url) {

      if (url.startsWith(".")) {
        let [plainUrl, ...optionsArr] = url.split("|");
        const optionsObj = Object.fromEntries(optionsArr.map((e) => e.split("=")));
        const optionsStr = optionsArr.join("|");

        let { width, height } = extractDimensions(optionsObj);

        let filename = plainUrl.substring(plainUrl.lastIndexOf("/") + 1);
        let title = extractTitle(filename);
        let metaData = createMetaData(plainUrl, width, height, title);

        if (url.includes("*")) {
          return handleWildcardUrls(plainUrl, optionsStr, width, height);
        } else {
          return handleRegularUrls(plainUrl, optionsStr, filename, metaData, optionsObj, url);
        }
      } else {
        return url;
      }
      
    }

    function extractDimensions(optionsObj) {
      let width = optionsObj.width || optionsObj.w || defaultWidth;
      let height = optionsObj.height || optionsObj.h || defaultHeight;

      if (width !== "auto") width = parseDimension(width, defaultWidth);
      if (height !== "auto") height = parseDimension(height, defaultHeight);

      return { width, height };
    }

    function parseDimension(value, defaultValue) {
      return parseInt(value) > 0 ? parseInt(value) : defaultValue;
    }

    function extractTitle(filename) {
      return filename.slice(0, filename.lastIndexOf(".")).replace(/\[\.\.\.\d*\]/, "");
    }

    function createMetaData(plainUrl, width, height, title) {
      return { width, height, title, url: plainUrl, description: "", artist: "", copyright: "" };
    }

    async function handleWildcardUrls(plainUrl, optionsStr, width, height) {

        const fullPath = path.posix.resolve(folder, plainUrl); // Full path normalization
        const files = glob.sync(plainUrl, { cwd: folder });
        
        // Normalize folder to avoid issues
        const folderNormalized = path.posix.normalize(folder).replace(/\\/g, "/");
        
        const fileIds = await Promise.all(
          files.map(async (file) => {
        
            // Generate relative path from `folder`
            const relativeFileUrl = path.posix
              .relative(folderNormalized, path.posix.join(folderNormalized, file)) // Ensure relative to folder
              .replace(/\\/g, "/"); // Convert backslashes to forward slashes
            
            const fileUrl = `./${relativeFileUrl}|${optionsStr}`;
            return await transformUrl(fileUrl);
          })

      );

      const fullIdentifier = `${fullPath}${optionsStr}`;
      const id = getUniqueId(fullIdentifier, wildcardUrls);

      wildcardUrls.set(fullIdentifier, { fileIds, id });
    //   console.log(wildcardUrls, fileIds);
      return `{${id}}`;
    }

    async function handleRegularUrls(plainUrl, optionsStr, filename, metaData, optionsObj, url) {
      const id = getUniqueId(url, urls);
      const { sizeStr, sizesStr } = generateSizeStrings(metaData.width, metaData.height);
      urls.set(id, {
        path: plainUrl,
        optionsMeta: `&metadata`,
        optionsEnhanced: `${sizesStr}&enhanced`,
        id,
        metaData,
        options: optionsObj,
      });

      const exifPromise = loadExifData(path.posix.join(folder, plainUrl)).then((exif) => {
        if (exif) {
          const prev = urls.get(id) || {};
          urls.set(id, {
            ...prev,
            metaData: {
              ...(prev.metaData || metaData),
              description: exif.ImageDescription ?? "",
              artist: exif.Artist ?? "",
              copyright: exif.Copyright ?? "",
            },
          });
        }
      }).catch((err) => {
        console.error('exif read failed for', plainUrl, err);
      });
      promises.push(exifPromise);

      return `{${id}}`;
    }

    function getUniqueId(identifier, map) {
      let camel = `_${toCamel(identifier)}`;
      const count = urlCount.get(camel);

      if (count && !map.has(identifier)) {
        urlCount.set(camel, count + 1);
        camel = `${camel}_${count}`;
      } else if (!map.has(identifier)) {
        urlCount.set(camel, 1);
      }

      return camel;
    }

    function generateSizeStrings(width, height) {
      if (height === "auto" && width === "auto") {
        return { sizeStr: "", sizesStr: "" };
      } else if (height === "auto") {
        return {
          sizeStr: `w=${width}`,
          sizesStr: generateSizesString(width, "w"),
        };
      } else if (width === "auto") {
        return {
          sizeStr: `h=${height}`,
          sizesStr: generateSizesString(height, "h"),
        };
      } else {
        return {
          sizeStr: `w=${width}&h=${height}`,
          sizesStr: `${generateSizesString(width, "w")}&${generateSizesString(height, "h")}`,
        };
      }
    }

    function generateSizesString(dimension, key, ratios = [0.5, 1.2, 2, 2.4, 4]) {
        return `${key}=` + ratios.map(ratio => Math.floor(dimension / ratio)).join(';');
      }

    function generateScripts(urls, wildcardUrls) {
      let script = "";

      urls.forEach((value) => {
        if (!value || !value.path) {
          console.error('generateScripts: skipping entry with missing path', value);
          return;
        }
        const optionsEnhanced = value.optionsEnhanced ?? "";
        const optionsMeta = value.optionsMeta ?? "";
        // defensive: avoid producing import "undefined?undefined"
        if (value.path.includes("undefined") || optionsEnhanced.includes("undefined") || optionsMeta.includes("undefined")) {
          console.error('generateScripts: invalid import specifier, skipping', { path: value.path, optionsEnhanced, optionsMeta });
          return;
        }

        script += `import ${value.id}Enhanced from "${value.path}?${optionsEnhanced}";\n`;
        script += `import ${value.id}Meta from "${value.path}?${optionsMeta}";\n`;
        script += `const ${value.id} = { enhanced: ${value.id}Enhanced, meta: ${value.id}Meta, exif: ${JSON.stringify(value.metaData || {})}, options: ${JSON.stringify(value.options || {})} };\n`;
      });

      wildcardUrls.forEach((value) => {
        script += `const ${value.id} = { files: [${value.fileIds.join(",")}], };\n`;
      });

      return script;
    }
  };
}
