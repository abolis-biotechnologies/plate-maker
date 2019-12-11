const fs = require('fs');

/**
 * Single out Cypress dependencies in a single file.
 * WARNING: this will overwrite the existing package.json !
 */
const npmPackage = JSON.parse(fs.readFileSync('package.json'));
const cypressPackage = {dependencies: {}, scripts: {}};

for (const field in npmPackage['optionalDependencies']) {
    if (field.indexOf('karma') < 0) {
        cypressPackage['dependencies'][field] = npmPackage['optionalDependencies'][field];
    }
}

// fixme there must be a better way to express the dependencies of our e2e environment
cypressPackage['dependencies']['typescript'] = npmPackage['devDependencies']['typescript'];
cypressPackage['dependencies']['@types/node'] = npmPackage['devDependencies']['@types/node'];

fs.writeFileSync('package.json', JSON.stringify( cypressPackage, null, 2));
