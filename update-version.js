const fs = require('fs');

// Read version from version.txt
const version = fs.readFileSync('VERSION.TXT', 'utf8').trim();

for(let path of ['./', './electron']) {
// Read and update package.json
  const packageJsonPath = `${path}/package.json`;
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if(packageJson.version === version) continue;
  
  packageJson.version = version;

  // Write back to package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
}
console.log(`Updated package.json version to ${version}`);
