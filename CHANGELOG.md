# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.1.1 (2025-12-30)

- Added release-please for automated release management
- Minor dependency updates

## [v1.1.0] - 2025-10-24

### Added

- Display of app/build version in the UI
- `CODEOWNERS` file
- Nix flake dev shell
- CI: PR workflow now runs lint & test

### Changed

- Content & UI:
  - Updated project page hero description.
  - Updated contact hero text and contact component.
  - Updated process steps.
  - Refreshed footer.
  - Updated FAQ section.
  - Added more further links.
- Tooling & Build:
  - Migrated from Yarn → pnpm.
  - Docker: consolidated to a single Dockerfile; base image moved to Node 25-alpine (from 24-alpine).
- Dependencies (highlights):
  - react-player → 3.3.3 (major).
  - react → 19.1.1 (patch), react-dom → 19.2.0.
  - react-router-dom → 7.7.0 (major; previously bumped from 6.x to 7.x).
  - vite → 7.0.x (major from 6.x).
  - @vitejs/plugin-react → 5.0.4 (major).
  - typescript → 5.8.3.
  - Various updates to ESLint plugins, @types/, postcss, autoprefixer, prettier, typescript-eslint.
- CI/Infra:
  - Version and build version are now set within the workflow.
  - Use of a GitHub App to commit workflow changes.
  - Dependabot configuration added; several GitHub Actions updated (e.g., actions/checkout@v5, actions/setup-node@v6, docker/build-push-action@v6).
  - Regular updates to stage container image tags.

### Fixed

- Incorrect src URL and styling issues.
- Ensured pnpm is installed in the node:25-alpine image.
- Fixed formatting check error; cleaned up linter annotations.

### Removed

- develop environment removed from workflows.

## [v1.0.6] - 2025-04-03

### Added

- video section (#94)

### Changed

- change content (#90)

## [v1.0.5] - 2025-03-20

### Changed

- add button in header to redirect to green ecolution demo instance in #89

## [v1.0.4] - 2025-01-12

### Changed

- update current project status in #86

### Changed

- update current process step to release 2 (#86)

## [v1.0.3] - 2024-09-17

### Added

- add background to header while scrolling down (#82)
- add GPL-3.0 license (#19)

### Changed

- unify naming of the project to 'Green Ecolution' (#83)
- update current process step to release 1 (#81)

## [v1.0.2] - 2024-08-01

### Changed

- refactor: change cookies to local storage (#77)
- ci: run only github actions when needed (#76)

## [v1.0.1] - 2024-07-17

### Changed

- chore: update organization name in code, docs and ci/cd

## [v1.0.0] - 2024-07-06

### Added

- feat: update readme (#25)
- feat: add stakeholder section as slider (#26)
- feat: add introduction section (#30)
- feat: add favicons (#31)
- feat: add current process section (#36)
- feat: add project page (#41)
- feat: add dashboard preview section (#43)
- feat: add advantages section (#45)
- feat: add contact section (#46)
- feat: add homepage hero (#50)
- feat: add contact page (#53)
- feat: add not found page (#54)
- feat: add hero homepage overlays (#56)
- feat: add background to sections (#59)

### Changed

- Improve CI/CD pipeline for deployment, staging and production

## [v0.0.1] - 2024-05-26

### Changed

- Improve CI/CD pipeline
- Initial release
- Create "Page under construction" Page

[v1.1.0]: https://github.com/green-ecolution/project-website/compare/v1.0.6...v1.1.0
[v1.0.6]: https://github.com/green-ecolution/project-website/compare/v1.0.5...v1.0.6
[v1.0.5]: https://github.com/green-ecolution/project-website/compare/v1.0.4...v1.0.5
[v1.0.4]: https://github.com/green-ecolution/project-website/compare/v1.0.3...v1.0.4
[v1.0.3]: https://github.com/green-ecolution/project-website/compare/v1.0.2...v1.0.3
[v1.0.2]: https://github.com/green-ecolution/project-website/compare/v1.0.1...v1.0.2
[v1.0.1]: https://github.com/green-ecolution/project-website/compare/v1.0.0...v1.0.1
[v1.0.0]: https://github.com/green-ecolution/project-website/compare/v0.0.1...v1.0.0
[v0.0.1]: https://github.com/green-ecolution/project-website/releases/tag/v0.0.1
