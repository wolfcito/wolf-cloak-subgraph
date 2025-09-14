# Wolf Cloak Subgraph

Subgraph para indexar eventos del contrato EncryptedERC en la red Fuji.

## Estructura
- `subgraph.template.yaml`: plantilla del manifest con variables de entorno.
- `subgraph.yaml`: manifest generado.
- `src/`: mappings en AssemblyScript.
- `abis/`: ABI del contrato.
- `schema.graphql`: entidades del subgraph.
- `scripts/render-manifest.js`: genera `subgraph.yaml` desde `.env` + plantilla.

## Requisitos
- Node.js 18+
- pnpm o npm
- Cuenta/clave de despliegue para tu host (Alchemy Subgraphs o Graph Studio)

## Configuración rápida
1) Copia y edita el archivo de entorno:
```
cd subgraph
cp .env.example .env
# Edita y completa:
# - DEPLOY_KEY
# - ENCRYPTEDERC_*_ADDRESS y *_START_BLOCK
```

2) Genera manifest, codegen y build:
```
npm run codegen
npm run build
```

3) Despliegue
- Alchemy Subgraphs (Hosted):
```
DEPLOY_KEY=xxxx npm run deploy
```
- Graph Studio:
```
npm run deploy:studio
```

> Nota: `npm run deploy` y `deploy:studio` ejecutan automáticamente `npm run manifest` para renderizar `subgraph.yaml` desde la plantilla.

## Scripts
- `npm run manifest`: genera `subgraph.yaml` a partir de `subgraph.template.yaml` y `.env`.
- `npm run codegen`: `manifest` + `graph codegen`.
- `npm run build`: `manifest` + `graph build`.
- `npm run deploy`: `manifest` + deploy al endpoint de Alchemy Subgraphs (usa `DEPLOY_KEY`).
- `npm run deploy:studio`: `manifest` + deploy a Graph Studio.

## Versionado y seguridad
- Se versiona: `subgraph.template.yaml`, `src/`, `abis/`, `schema.graphql`, `scripts/`, `.env.example`, `package.json`, `pnpm-lock.yaml`.
- No se versiona: `.env`, `subgraph.yaml`, `build/`, `generated/`, `node_modules/`, etc. (definido en `.gitignore`).
- No coloques claves en el repo; usa `.env`. Si una clave fue expuesta, róta la credencial en tu proveedor.

## Licencia
MIT. Ver archivo `LICENSE` en la raíz del repositorio.
