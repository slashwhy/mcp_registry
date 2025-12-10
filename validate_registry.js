const fs = require('fs');
const path = require('path');

const v01Path = path.join(__dirname, 'v0.1', 'servers');

try {
  // Validate the main list (v0.1/servers)
  const listContent = fs.readFileSync(v01Path, 'utf8');
  const registry = JSON.parse(listContent);

  if (!Array.isArray(registry)) {
    throw new Error('v0.1/servers must be a JSON Array.');
  }

  registry.forEach((server, index) => {
    if (!server.name) throw new Error(`Server at index ${index} missing "name".`);
    
    // Check for packages array instead of top-level transport
    if (!server.packages || !Array.isArray(server.packages)) {
        throw new Error(`Server at index ${index} missing "packages" array.`);
    }
    
    // Validate first package has transport
    const pkg = server.packages[0];
    if (!pkg.transport?.url) {
        throw new Error(`Server at index ${index} package missing "transport.url".`);
    }

    if (!server.description) throw new Error(`Server at index ${index} missing "description".`);
    
    // Validate repository
    if (!server.repository || !server.repository.url) {
        throw new Error(`Server at index ${index} missing "repository.url".`);
    }
    if (!server.tags || !Array.isArray(server.tags)) {
        throw new Error(`Server at index ${index} missing "tags" array.`);
    }
  });

  console.log('✅ Registry structure is valid (v0.1 single-file compliance verified).');
} catch (error) {
  console.error('❌ Validation failed:', error.message);
  process.exit(1);
}
