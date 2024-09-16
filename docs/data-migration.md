# 環境間のデータ移行

## d1

### export

```bash
cd apps/api
# developからデータをエクスポートする場合
# npx wrangler d1 export --env develop da-acsta-db-develop --remote --output=./_d1/export_develop_20240801.sql
npx wrangler d1 export --env <env-name> <database-name> --remote --output=<output-path>
```

### exportファイルの修正

#### Foreign key制約を無効化する

ファイル先頭と末尾に以下を追加

##### 先頭

```sql
PRAGMA defer_foreign_keys = on;
```

##### 末尾

```sql
PRAGMA defer_foreign_keys = off;
```

#### 外部キー制約の関係性でCreate tableを並び替える

依存しているものが先に作成されるようにCreate tableを並び替える
exportしたsqlファイルをテキストでAIに読み込ませてもらい、Create tableを並び替えてもらっても良い。

### import

```bash
cd apps/api
# stressにデータをインポートする場合
# npx wrangler d1 execute --env stress da-acsta-db-stress --remote --file=./_d1/export_develop_20240801.sql
npx wrangler d1 execute --env <env-name> <database-name> --remote --file=<input-path>
```

## R2

### download

```bash
# developからデータをダウンロードする場合
# aws s3 --endpoint-url https://d13a85c5ad0898a62c4f98154be549c7.r2.cloudflarestorage.com cp s3://da-acsta-bucket-develop/ ./_r2 --recursive
aws s3 --endpoint-url <endpoint-url> cp s3://<backet-name>/ <download-path> --recursive
```

### upload

```bash
# stressにデータをアップロードする場合
# aws s3 --endpoint-url https://d13a85c5ad0898a62c4f98154be549c7.r2.cloudflarestorage.com cp ./_r2 s3://da-acsta-bucket-stress --recursive
aws s3 --endpoint-url <endpoint-url> cp <upload-path> s3://<backet-name> --recursive
```
