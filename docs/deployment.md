# Deployment

## CMS

> [!NOTE]
> The `apps/cms/wrangler.toml` must have been correctly configured.

```bash
cd apps/cms
# production
yarn deploy:production
# preview
yarn deploy:preview
```

## API

> [!NOTE]
> The `apps/api/wrangler.toml` must have been correctly configured.

```bash
cd apps/api
yarn deploy
```
