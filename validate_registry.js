const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, 'registry.json');

try {
  const content = fs.readFileSync(registryPath, 'utf8');
  const registry = JSON.parse(content);

  if (!registry.servers || !Array.isArray(registry.servers)) {
    throw new Error('Registry must contain a "servers" array.');
  }

  registry.servers.forEach((server, index) => {
    if (!server.name) throw new Error(`Server at index ${index} missing "name".`);
    if (!server.url) throw new Error(`Server at index ${index} missing "url".`);
    if (!server.description) throw new Error(`Server at index ${index} missing "description".`);
    if (!server.tags || !Array.isArray(server.tags)) {
        throw new Error(`Server at index ${index} missing "tags" array.`);
    }
  });

  console.log('✅ registry.json is valid (Passed extended best-practice checks).');
} catch (error) {
  console.error('❌ Validation failed:', error.message);
  process.exit(1);
}
