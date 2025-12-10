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
    // Allow 'transport.url' instead of top-level 'url' based on new structure
    if (!server.transport?.url && !server.url) throw new Error(`Server at index ${index} missing "transport.url" or "url".`);
    if (!server.description) throw new Error(`Server at index ${index} missing "description".`);
    if (!server.tags || !Array.isArray(server.tags)) {
        throw new Error(`Server at index ${index} missing "tags" array.`);
    }
  });

  console.log('✅ Registry structure is valid (v0.1 single-file compliance verified).');
} catch (error) {
  console.error('❌ Validation failed:', error.message);
  process.exit(1);
}
