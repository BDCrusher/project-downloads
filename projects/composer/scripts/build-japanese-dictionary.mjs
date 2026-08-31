import { createHash } from "node:crypto";
import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, join, resolve } from "node:path";
import { brotliCompressSync, constants, gunzipSync } from "node:zlib";

const version = "1.0.0";
const sourceRoot = resolve(process.argv[2] ?? "");
const outputRoot = resolve(process.argv[3] ?? ".release-staging/japanese-dictionary-v1.0.0");
const sourceDictionary = join(sourceRoot, "dict");

if (!statSync(join(sourceRoot, "LICENSE-2.0.txt")).isFile()) {
  throw new Error("Expected an extracted kuromoji@0.1.2 package as the first argument.");
}

rmSync(outputRoot, { force: true, recursive: true });
mkdirSync(join(outputRoot, "dict"), { recursive: true });
mkdirSync(join(outputRoot, "LICENSES"), { recursive: true });

const files = [];
for (const sourceName of readdirSync(sourceDictionary).filter((name) => name.endsWith(".dat.gz")).sort()) {
  const outputName = sourceName.slice(0, -3) + ".br";
  const raw = gunzipSync(readFileSync(join(sourceDictionary, sourceName)));
  const compressed = brotliCompressSync(raw, {
    params: {
      [constants.BROTLI_PARAM_QUALITY]: 11,
      [constants.BROTLI_PARAM_MODE]: constants.BROTLI_MODE_GENERIC,
    },
  });
  const outputPath = join(outputRoot, "dict", outputName);
  writeFileSync(outputPath, compressed);
  files.push({
    path: `dict/${outputName}`,
    bytes: compressed.byteLength,
    sha256: createHash("sha256").update(compressed).digest("hex"),
    raw_bytes: raw.byteLength,
    raw_sha256: createHash("sha256").update(raw).digest("hex"),
  });
}

copyFileSync(join(sourceRoot, "LICENSE-2.0.txt"), join(outputRoot, "LICENSES", "kuromoji-LICENSE-2.0.txt"));
copyFileSync(join(sourceRoot, "NOTICE.md"), join(outputRoot, "LICENSES", "kuromoji-NOTICE.md"));

const manifest = {
  schema_version: 1,
  asset: "composer-japanese-dictionary",
  version,
  compression: "brotli",
  source: {
    package: "kuromoji",
    version: "0.1.2",
    license: "Apache-2.0",
    npm: "https://www.npmjs.com/package/kuromoji/v/0.1.2",
  },
  files,
};

writeFileSync(join(outputRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
writeFileSync(
  join(outputRoot, "README.txt"),
  [
    "Composer Japanese Offline Dictionary",
    `Version ${version}`,
    "",
    "Optional Brotli-compressed Kuromoji dictionary data for local Japanese tokenization.",
    "Generated from the Apache-2.0 licensed kuromoji@0.1.2 npm package.",
    "See LICENSES for the required license and NOTICE files.",
    "",
  ].join("\r\n"),
);

const totalBytes = files.reduce((sum, file) => sum + file.bytes, 0);
console.log(`Created ${basename(outputRoot)} with ${files.length} dictionary files (${totalBytes} bytes).`);

