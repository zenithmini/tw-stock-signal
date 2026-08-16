import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const outputDirectory = resolve("dist/client");
const indexPath = resolve(outputDirectory, "index.html");
const notFoundPath = resolve(outputDirectory, "404.html");

const source = await readFile(indexPath, "utf8");
const portableHtml = source.replaceAll("/assets/", "./assets/");

if (!portableHtml.includes('./assets/')) {
  throw new Error("GitHub Pages preparation did not find any static asset references.");
}

await writeFile(indexPath, portableHtml);
await writeFile(notFoundPath, portableHtml);
console.log("Prepared dist/client for GitHub Pages subpath hosting.");
