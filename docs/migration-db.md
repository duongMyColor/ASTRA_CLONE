# Migrate DB & seed DB

## Migration

Pagesは環境にpreviewとproductionしか使用できないため、Workersのapi側のアプリでDBのマイグレーションを行う。

```bash
cd apps/api
```

### Create migration

```bash
yarn db:migrate create
```

> [!NOTE]
> If you get the error "D1 database is not local", please run the following A: Apply the migration for local first.

### A: Apply the migration for local

```bash
yarn db:migrate apply
```

### B: Apply the migration for remote DB

```bash
# develop
yarn db:migrate apply --remote --env develop -d da-acsta-db-develop

# staging
yarn db:migrate apply --remote --env staging -d da-acsta-db-staging

# stress
yarn db:migrate apply --remote --env stress -d da-acsta-db-stress

# qa
yarn db:migrate apply --remote --env qa -d da-acsta-db-qa

# production
yarn db:migrate apply --remote --env production -d da-acsta-db-production
```

> [!NOTE]
> If you got error from selecting account_id. Deploy api using API section from [deployment.md](deployment.md)

## Seed DB

```bash
# develop
yarn db:seed --env develop

# staging
yarn db:seed --env staging

# stress
yarn db:seed --env stress

# qa
yarn db:seed --env qa

# production
yarn db:seed --env production
```
