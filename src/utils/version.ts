/**
 * Version utility functions
 * Provides version information and management
 */

import { readFileSync } from 'fs';
import { join } from 'path';

interface PackageInfo {
    name: string;
    version: string;
    description: string;
}

export class VersionManager {
    private static packageInfo: PackageInfo | null = null;

    /**
     * Get package information from package.json
     */
    static getPackageInfo(): PackageInfo {
        if (!this.packageInfo) {
            try {
                const packagePath = join(process.cwd(), 'package.json');
                const packageData = readFileSync(packagePath, 'utf8');
                this.packageInfo = JSON.parse(packageData);
            } catch (error) {
                console.error('Error reading package.json:', error);
                this.packageInfo = {
                    name: 'unknown',
                    version: '0.0.0',
                    description: 'Unknown package'
                };
            }
        }
        return this.packageInfo;
    }

    /**
     * Get current version
     */
    static getCurrentVersion(): string {
        return this.getPackageInfo().version;
    }

    /**
     * Get version info for API responses
     */
    static getVersionInfo() {
        const pkg = this.getPackageInfo();
        return {
            name: pkg.name,
            version: pkg.version,
            description: pkg.description,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Parse version string into components
     */
    static parseVersion(version: string): { major: number; minor: number; patch: number } {
        const [major, minor, patch] = version.split('.').map(Number);
        return { major, minor, patch };
    }

    /**
     * Compare two versions
     * Returns: 1 if v1 > v2, -1 if v1 < v2, 0 if equal
     */
    static compareVersions(v1: string, v2: string): number {
        const version1 = this.parseVersion(v1);
        const version2 = this.parseVersion(v2);

        if (version1.major !== version2.major) {
            return version1.major - version2.major;
        }
        if (version1.minor !== version2.minor) {
            return version1.minor - version2.minor;
        }
        return version1.patch - version2.patch;
    }
}
