# Project Downloads

A shared home for versioned downloadable files, optional components, language packs, models, and other large assets used by current or future projects.

## Projects

| Project | Available assets |
| --- | --- |
| [Composer](projects/composer) | Japanese offline dictionary |

Each project owns its manifests, build tooling, and documentation under `projects/<project>`. Release tags and asset names begin with the project name to prevent collisions as more projects are added.

## Release Rules

- Tag format: `<project>-<asset>-v<version>`
- Every downloadable file has a machine-readable manifest.
- Manifests include the exact byte size, SHA-256 digest, and stable release URL.
- Third-party assets include their required licenses and notices.
- Large generated files live in GitHub Releases instead of Git history.

