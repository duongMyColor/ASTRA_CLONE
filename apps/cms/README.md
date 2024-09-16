https://github.com/saco-team/da-acstar-cms.gitThis is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Note: Create .env file base on .sample.env

# 2. Run app in local machine without Docker

## 2.1 Generate DB (at `apps/api` folder)

`$ yarn db:migrate apply --env develop`

## 2.2 For developer
### If you modify schema you shoud run

`$ yarn db:migrate create`

### At migration file created (.sql file) remove `PRAGMA foreign_key_check` if you got error `not authorize`. It's not supported from SQLite D1 Database currently

### Run apply again
`$ yarn db:migrate apply`

## Add seed local

- db_name: see `apps/cms/wrangler.toml`
- `npx wrangler d1 execute <db_name> --local --file=./prisma/seed.sql `

ex: 

`npx wrangler d1 execute da-acsta-db --local --file=./prisma/seed.sql`

## Add seed remote (for deployment)

`yarn db:seed`

# 3. App URL

- http://localhost:3000/

# 4. Default User: see `consts/user.ts`

# 5. Folder structure: see [project-structure.md](docs/project-structure.md)

# 6. CRUD creation instruction: [CRUD-scaffold.md](docs/CRUD-scaffold.md)
