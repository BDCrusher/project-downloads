# Composer

Optional downloadable assets for Composer.

## Japanese Offline Dictionary

Provides local Japanese tokenization data for automatic romanization without increasing Composer's base download size.

- Release tag: `composer-japanese-dictionary-v1.0.0`
- Install location: `Composer-Data/tools/language/japanese`
- Manifest: [`manifests/japanese-dictionary.json`](manifests/japanese-dictionary.json)
- Build script: [`scripts/build-japanese-dictionary.mjs`](scripts/build-japanese-dictionary.mjs)

The dictionary is regenerated from the Apache-2.0 licensed `kuromoji@0.1.2` package. The release archive includes Kuromoji's license and NOTICE.
