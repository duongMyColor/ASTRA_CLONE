# Environment Building

## Table of Contents

- [Environment Building](#environment-building)
  - [Table of Contents](#table-of-contents)
  - [Create Project](#create-project)
    - [Pages](#pages)
  - [Create D1 Database](#create-d1-database)
  - [Create R2 Bucket](#create-r2-bucket)
    - [Create bucket](#create-bucket)
    - [Create R2 API Tokens for bucket](#create-r2-api-tokens-for-bucket)
    - [Enable CORS](#enable-cors)
  - [Set Environment Variables](#set-environment-variables)

## Create Project

### Pages

```bash
npx wrangler pages project create <PROJECT_NAME> [OPTIONS]
```

## Create D1 Database

```bash
npx wrangler d1 create <name>
```

💡name example: `da-acsta-dev-db`

> [!NOTE]
> After execution, insert `database_name` and `database_id` from response into `wrangler.toml` file

## Create R2 Bucket

### Create bucket

```bash
npx wrangler r2 bucket create <name>
```

💡name example: `da-acsta-dev-bucket`

### Create R2 API Tokens for bucket

R2 API tokens can have full permission to interact with you data. But in this case, should specify tokens for specific bucket

- At R2 section. Select **Manage R2 API Tokens**
- Select **Create API token** button
- Enter token name
- Permissions: Select **_Object Read only: Allows the ability to read and list objects in specific buckets._** to allow Read operation.
- Specify bucket(s): Select **_Apply to specific buckets only_** -> Select your bucket
- Click **Create API Token**
- Store all of your Token information in a safety place

### Enable CORS

- At R2 section. Select your bucket you've created
- Navigate to **Settings**
- Scroll to **CORS Policy** section -> **Add CORS policy**
- Enter following rules and save

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET"],
    "AllowedHeaders": ["*"]
  }
]
```

> [!NOTE]
>
> TODO: After deployment, update the origins to the allowed origin you've deployed

> [!NOTE]
>
> Don't forget update `bucket_name` in `wrangler.toml` file

## Set Environment Variables

- Go to CloudFlare Dashboard
- Select `Workers & Pages` on sidebar
- Select application `da-acsta-api` -> Settings -> Variables -> Add variable:

  - `CLOUDFLARE_ACCOUNT_ID`: your account_id
  - `CLOUDFLARE_ACCESS_KEY_ID`: access key from step [Create R2 API Tokens for bucket](#create-r2-api-tokens-for-bucket)
  - `CLOUDFLARE_SECRET_ACCESS_KEY`: secret key from step [Create R2 API Tokens for bucket](#create-r2-api-tokens-for-bucket)
  - `CLOUDFLARE_BUCKET_NAME`: your bucket name
  - `USERNAME`: your username using for Basic Authentication
  - `PASSWORD`: your password using for Basic Authentication
