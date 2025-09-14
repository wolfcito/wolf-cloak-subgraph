#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const templatePath = path.join(root, 'subgraph.template.yaml');
const outputPath = path.join(root, 'subgraph.yaml');
const envPath = path.join(root, '.env');

// Minimal .env loader (no external deps)
function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const text = fs.readFileSync(filePath, 'utf8');
  const obj = {};
  for (const line of text.split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith('\'') && value.endsWith('\''))) {
      value = value.slice(1, -1);
    }
    obj[key] = value;
  }
  return obj;
}

const envFromFile = loadDotEnv(envPath);
for (const [k, v] of Object.entries(envFromFile)) {
  if (!(k in process.env)) process.env[k] = v;
}

const required = [
  'ENCRYPTEDERC_STANDALONE_ADDRESS',
  'ENCRYPTEDERC_STANDALONE_START_BLOCK',
  'ENCRYPTEDERC_CONVERTER_ADDRESS',
  'ENCRYPTEDERC_CONVERTER_START_BLOCK',
];

const missing = required.filter((k) => !process.env[k] || String(process.env[k]).trim() === '');
if (missing.length) {
  console.error('Missing required env vars for manifest:', missing.join(', '));
  console.error('Create subgraph/.env or export them before running.');
  process.exit(1);
}

if (!fs.existsSync(templatePath)) {
  console.error('Template not found:', templatePath);
  process.exit(1);
}

let template = fs.readFileSync(templatePath, 'utf8');
template = template.replace(/\$\{([A-Z0-9_]+)\}/g, (_, name) => {
  const val = process.env[name];
  if (val == null) {
    console.error(`Missing env for placeholder \${${name}}`);
    process.exit(1);
  }
  return String(val);
});

fs.writeFileSync(outputPath, template);
console.log('Wrote manifest:', path.relative(process.cwd(), outputPath));

