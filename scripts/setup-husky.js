#!/usr/bin/env node

/**
 * Setup script for Husky Git hooks
 * This provides a more robust solution for automatic version updates
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Husky for automatic version updates...');

try {
    // Install husky if not already installed
    console.log('📦 Installing husky...');
    execSync('npm install --save-dev husky', { stdio: 'inherit' });

    // Create .husky directory
    const huskyDir = '.husky';
    if (!fs.existsSync(huskyDir)) {
        fs.mkdirSync(huskyDir);
    }

    // Create pre-commit hook
    const preCommitHook = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔧 Auto-updating patch version..."
npm version patch --no-git-tag-version
git add package.json package-lock.json
echo "✅ Patch version updated and staged"
`;

    fs.writeFileSync(path.join(huskyDir, 'pre-commit'), preCommitHook);
    
    // Make the hook executable
    execSync(`chmod +x ${path.join(huskyDir, 'pre-commit')}`);

    // Initialize husky
    console.log('🚀 Initializing husky...');
    execSync('npx husky install', { stdio: 'inherit' });

    // Add prepare script to package.json
    console.log('📝 Adding prepare script to package.json...');
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (!packageJson.scripts.prepare) {
        packageJson.scripts.prepare = 'husky install';
        fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 4) + '\n');
    }

    console.log('✅ Husky setup completed successfully!');
    console.log('');
    console.log('Now every commit will automatically:');
    console.log('  - Bump the patch version in package.json');
    console.log('  - Stage the updated package.json and package-lock.json');
    console.log('');
    console.log(`Current version: ${packageJson.version}`);

} catch (error) {
    console.error('❌ Error setting up Husky:', error.message);
    process.exit(1);
}
