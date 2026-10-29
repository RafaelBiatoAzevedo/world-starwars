import { mkdir, writeFile, rename } from 'node:fs/promises';

const categories = ['people', 'planets', 'films', 'species', 'starships', 'vehicles'];
const data = {};
for (const category of categories) {
  const response = await fetch(`https://swapi.info/api/${category}`, {
    signal: AbortSignal.timeout(30_000),
  });
  if (!response.ok) throw new Error(`${category}: HTTP ${response.status}`);
  const records = await response.json();
  if (
    !Array.isArray(records) ||
    !records.length ||
    records.some(record => !record.url || !(record.name || record.title))
  ) {
    throw new Error(`Resposta inválida para ${category}. O catálogo anterior foi preservado.`);
  }
  data[category] = records.map(({ created, edited, ...record }) => record);
  console.log(`${category}: ${records.length} registros`);
}
await mkdir('src/data', { recursive: true });
const snapshot = {
  updatedAt: new Date().toISOString(),
  source: 'https://swapi.info',
  resources: data,
};
await writeFile('src/data/snapshot.json.tmp', JSON.stringify(snapshot));
await rename('src/data/snapshot.json.tmp', 'src/data/snapshot.json');
console.log('Catálogo completo atualizado.');
