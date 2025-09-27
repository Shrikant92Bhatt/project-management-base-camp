# Version Management Guide

This document explains how automatic version updates work in Project Camp Backend.

## Overview

The project includes automatic patch version updates on every commit, ensuring that each commit has a unique version number for tracking and deployment purposes.

## Setup Options

### Option 1: Simple Git Hooks (Basic)

Run the setup script to install basic Git hooks:

```bash
npm run setup:git-hooks
```

This will:
- Create a pre-commit hook that automatically bumps the patch version
- Make the hook executable
- Install it in your `.git/hooks/` directory

### Option 2: Husky (Recommended)

For a more robust solution with better error handling:

```bash
npm run setup:husky
```

This will:
- Install Husky as a dev dependency
- Set up proper Git hooks with Husky
- Add a prepare script to package.json
- Create a `.husky/` directory with pre-commit hooks

## How It Works

### Automatic Version Updates

Every time you make a commit, the system will:

1. **Bump the patch version** in `package.json` (e.g., 1.0.0 → 1.0.1)
2. **Stage the updated files** (`package.json` and `package-lock.json`)
3. **Continue with your commit**

### Manual Version Updates

You can also manually update versions:

```bash
# Patch version (1.0.0 → 1.0.1) - bug fixes
npm run version:patch

# Minor version (1.0.0 → 1.1.0) - new features
npm run version:minor

# Major version (1.0.0 → 2.0.0) - breaking changes
npm run version:major
```

## Version Utilities

The project includes a `VersionManager` class for programmatic version handling:

```typescript
import { VersionManager } from './utils';

// Get current version
const version = VersionManager.getCurrentVersion(); // "1.0.0"

// Get full version info
const info = VersionManager.getVersionInfo();
// Returns: { name, version, description, timestamp }

// Parse version components
const { major, minor, patch } = VersionManager.parseVersion("1.2.3");

// Compare versions
const result = VersionManager.compareVersions("1.1.0", "1.0.0"); // 1 (greater)
```

## Version Endpoint

The application exposes a version endpoint:

```
GET /version
```

Response:
```json
{
  "name": "project-camp",
  "version": "1.0.0",
  "description": "Project management application for beginner",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Best Practices

### Version Numbering

- **Patch (x.x.X)**: Bug fixes, small improvements
- **Minor (x.X.x)**: New features, backwards compatible
- **Major (X.x.x)**: Breaking changes, major rewrites

### Commit Messages

With automatic patch updates, focus on meaningful commit messages:

```bash
# Good
git commit -m "Add user authentication middleware"
git commit -m "Fix database connection timeout issue"

# Avoid
git commit -m "update"
git commit -m "fix"
```

### Deployment

The automatic version updates make it easy to track deployments:

1. Each commit has a unique version
2. Version endpoint shows current deployment version
3. Easy to rollback to specific versions
4. Clear version history in Git

## Troubleshooting

### Git Hook Not Working

1. Check if the hook is executable:
   ```bash
   ls -la .git/hooks/pre-commit
   ```

2. Reinstall hooks:
   ```bash
   npm run setup:git-hooks
   ```

### Husky Issues

1. Reinstall Husky:
   ```bash
   npm run setup:husky
   ```

2. Check Husky installation:
   ```bash
   npx husky install
   ```

### Version Conflicts

If you have version conflicts:

1. Manually resolve in `package.json`
2. Commit the resolved version
3. Continue with normal workflow

## Disabling Automatic Updates

To temporarily disable automatic version updates:

1. Remove or rename the pre-commit hook:
   ```bash
   mv .git/hooks/pre-commit .git/hooks/pre-commit.disabled
   ```

2. To re-enable:
   ```bash
   mv .git/hooks/pre-commit.disabled .git/hooks/pre-commit
   chmod +x .git/hooks/pre-commit
   ```

## Integration with CI/CD

The version endpoint can be used in CI/CD pipelines:

```bash
# Get current version for deployment
CURRENT_VERSION=$(curl -s http://localhost:3000/version | jq -r '.version')

# Tag the deployment
git tag "v$CURRENT_VERSION"
git push origin "v$CURRENT_VERSION"
```

This ensures that every deployment is properly versioned and traceable.
