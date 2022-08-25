// export const slugFromPath = (path) => path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;
// const slugFromPath = (path) => path.match(/([\w-]+)(\/index)?\.(svelte\.md|md|svx)/i)?.[1] ?? null;
const slugFromPath = (path) => path.match(/(.\/content\/)(.*?)(\/index)?(\.de|\.en)?\.(svelte\.md|md|svx)/i)?.[2].replaceAll(/\[\.\.\.\d*\]/g, '') ?? null;

export {
    slugFromPath
}
