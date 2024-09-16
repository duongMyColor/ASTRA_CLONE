# 負荷テスト

実行前に対象のreportフォルダ(new or normal)を削除してください。

## アプリリリース直後

コンテンツデータの変更なし(ファイルサーバーへのアクセスなし)

```bash
cd apps/api/jmeter
jmeter -n -t TestPlan.jmx -JdurationNew=610 -JrampupNew=600 -JthreadsNew=102 -Jthreads=0 -l log/new.jtl -e -o report/new
```

## 通常運用時

コンテンツデータの変更あり(ファイルサーバーへのアクセスあり)

```bash
cd apps/api/jmeter
jmeter -n -t TestPlan.jmx -Jduration=610 -Jrampup=600 -Jthreads=102 -JthreadsNew=0 -l log/normal.jtl -e -o report/normal
```
