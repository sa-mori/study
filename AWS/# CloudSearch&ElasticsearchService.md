# CloudSearch&ElasticsearchService.md
- 転地索引
	- 書籍の巻末にある単語ごとの索引のようなもの
	- 文章を単語で区切るが、検索制度としては、表記揺れ、類義語、正規化が必要。

## CloudSearch
- Apache Solr
- AutoScaling(ELB+EC2)/AutoPartitioning(最初はスケールアップ、賄えなければスケールアウト。)
- パーティションの分割処理はEMRで。
- データを受け取ったノードは、S3に保存し、メタ情報をDynamoDBへ。

## Elasticsearch Service
- 各ノードのEBSボリュームのサイズは指定可能
- ノードの最大数は10
- Zone awareness - 複数AZ
- 自動スケールはしない
- バックアップは自動で日に一回、リストアはAWSへお願い。
- APIでS3へバックアップ可能。いつでもリストア可能。

## 2つの違い
- 検索の速さはCloudSearch。
- 大量のデータ保存はES
- ログの可視化、取り込みのリアルタイム性、API利用の自由度はES
- 運用の楽さはCloudSearch