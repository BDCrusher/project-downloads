# Composer Downloads

Versioned optional downloads for Composer that are intentionally kept out of the main application package.

## Available Assets

| Asset | Purpose | Release |
| --- | --- | --- |
| Japanese Offline Dictionary | Enables local Japanese tokenization for automatic romanization without increasing the base Composer download | `japanese-dictionary-v1.0.0` |

Applications should read the JSON files in [`manifests`](manifests) instead of hard-coding asset sizes or checksums. Release files are installed only when a user requests the related optional feature.

## Integrity

Every manifest includes the release URL, exact byte size, and SHA-256 digest. Composer should download to a temporary file, verify both values, and then move the file into `Composer-Data` atomically.

## Licensing

Each release asset carries the licenses and notices for its included third-party data. The Japanese dictionary is regenerated from the Apache-2.0 licensed `kuromoji@0.1.2` npm package; it does not redistribute the unlicensed `kuroshiro-browser` package.

