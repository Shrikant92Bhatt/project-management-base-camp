#!/bin/bash

# Setup script for Git hooks
echo "🔧 Setting up Git hooks for automatic version updates..."

# Make the pre-commit hook executable
chmod +x .githooks/pre-commit

# Install the pre-commit hook
cp .githooks/pre-commit .git/hooks/pre-commit

# Make the copied hook executable
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks installed successfully!"
echo ""
echo "Now every commit will automatically:"
echo "  - Bump the patch version in package.json"
echo "  - Stage the updated package.json and package-lock.json"
echo ""
echo "Current version: $(node -p "require('./package.json').version")"
