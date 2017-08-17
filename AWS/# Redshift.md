# Redshift
## 構成
- LeaderNode-ComputeNode構成
- LeaderNode-ComputeNode間は10Gb Ether
	- MPP(Massive Parallel Processing)
	- シェアードナッシング
	- SSDベースとHDDベース
	- データは圧縮されるため、実際より多く格納できる。
	- LeaderNodeは費用に含まれない。
	- IOを削減するアーキテクチャ
		- 列指向型
		- 圧縮
		- ゾーンマップ
## 最適なユースケース
- 巨大なデータセット
- SQLは複雑だが同時実行性が低い
- データの更新は一括導入

## 向かないケース
- 並列実行数が多い
- 極めて短いレイテンシ
- ランダム、かつパラレルな更新アクセス
- 巨大なデータを格納するが集計等はしない

## パフォーマンスを意識した作り
- IO及び、ノード間通信を減らすこと
	- 型を適切に。
	- 適切な圧縮方法
	- SORTKEY
	- データ平準化
		- JOIN対象のデータは同一ノードの集める。
## その他
- S3にデータを集約する。
- EMR,DynamoDB,EC2は直置きも。
- 制約が存在しない
- テーブルのANALYZE,VACUUM
- バックアップはスナップショットでS3へ。別リージョンにも作成可能。KMS暗号化済のスナップショット転送にも対応。
- WLM(WorkloadManagement)

## それぞれの特徴
- ElastiCache
	- 低レイテンシ
	- インメモリ
- RDS
	- トランザクション処理
	- 汎用用途
- DynamoDB
	- 3拠点間でのレプリケーション
	- SSDに永続化
- Redshift
	- 集計処理
	- 大容量