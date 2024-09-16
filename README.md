# Overview

DA 大相撲AR Project.

This is Monorepo using Turborepo as the management tool. Nextjs framework to run a React-Admin-based CMS. Hono framework to run the API.

## System diagram

```mermaid
graph TB
    subgraph Cloudflare_Edge
        Pages["Pages (CMS)"]
        Workers1["Workers (API for CMS)"]
        D1["D1 (SQLite)"]
        R2["R2 (File)"]
        Workers2["Workers (API)"]

        Pages --> Workers1
        Workers1 --> D1
        Workers1 --> R2
        Workers2 ==> D1
        Workers2 ==> R2
    end

    管理者["admin user\nPC"] --> Pages
    user["user\nSmart Phone App"] ==> Workers2
```

💡Bold lines have a lot of access.

## Technology used

<!-- https://t8csp.csb.app/ -->

<p style="display: inline">
  <img src="https://img.shields.io/badge/-Turborepo-000000.svg?logo=turborepo&style=for-the-badge">
   <img src="https://img.shields.io/badge/-githubactions-000000.svg?logo=github-actions&style=for-the-badge">
</p>

### CMS

<p style="display: inline">
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/-Prisma-000000.svg?logo=prisma&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Cloudflare-000000.svg?logo=cloudflare&style=for-the-badge">
</p>

### API

<p style="display: inline">
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Hono-000000.svg?logo=hono&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Prisma-000000.svg?logo=prisma&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Cloudflare-000000.svg?logo=cloudflare&style=for-the-badge">
</p>

## Table of Contents

- [Environment Structure](#environment-structure)
- [Project structure](#project-structure)
- [Pre-installation](#pre-installation)
- [Installation(for Local)](#installationfor-local)
- [Installation(for Cloudflare)](#installationfor-cloudflare)

## Environment Structure

各環境ごとにCloudflare(CF)の Pages, D1, R2が別れている。

| Environment Name | Deploy Pipeline Branch | Who                 | CF Pages Project        | CF D1 DB Name          | CF R2 Bucket Name          |
| ---------------- | ---------------------- | ------------------- | ----------------------- | ---------------------- | -------------------------- |
| develop          | develop                | Miraiplay Developer | da-acsta-cms-develop    | da-acsta-db-develop    | da-acsta-bucket-develop    |
| staging          | staging                | Miraiplay Tester    | da-acsta-cms-staging    | da-acsta-db-staging    | da-acsta-bucket-staging    |
| stress           | stress                 | Miraiplay Developer | da-acsta-cms-stress     | da-acsta-db-stress     | da-acsta-bucket-stress     |
| qa               | qa                     | Outside QA Tester   | da-acsta-cms-qa         | da-acsta-db-qa         | da-acsta-bucket-qa         |
| production       | main                   | Digital Art         | da-acsta-cms-production | da-acsta-db-production | da-acsta-bucket-production |

## Project structure

See [project-structure.md](./docs/project-structure.md)

## Pre-installation

The following must be installed.

- [Nodes(v18 or higher)](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/)
- [turborepo](https://turbo.build/repo/docs/getting-started/installation#global-installation)

## Installation(for Local)

### Install dependencies

```bash
yarn install
```

### Create `.env` file base on `.sample.env` of each `apps`

If the set value is not known, ask [Ishida](m.ishida@miraiplay.jp)/[Takahashi](takahashi@miraiplay.jp).

### Follow [README](./apps/cms/README.md) to setup local environment

### Run app in dev mode

```bash
yarn dev:cms
```

```bash
yarn dev:api
```

## Installation(for Cloudflare)

### Environment building

See [environment-building.md](./docs/environment-building.md)

### Migration DB & Seed DB

See [migration-db.md](./docs/migration-db.md)

### Deploy

See [deployment.md](./docs/deployment.md)

### 環境間のデータ移行

See [data-migration.md](./docs/data-migration.md)

### 負荷テスト

See [stress-test.md](./docs/stress-test.md)
