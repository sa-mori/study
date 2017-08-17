# CloudTrail&Config.md
## CloudTrail
- データは暗号化され、S3に保存される
	- KMSを使った暗号化もサポート
- LogをJSON形式でCloudWatchLogsへ転送(SSL)
	- アラーム作成ができる
## AWS Config
- リソースの変更履歴、構成変更を管理する
	- Configuration Stream
	- Configuration History
	- Configuration Snapshot
	- リソースの依存関係
	- Terminateしたインスタンスも確認可能	
- AWS Config Rulesによるポリシー適合の評価
	- EC2インスタンスが適切にタグ付けされているか
	- EBSボリュームが暗号化されているかなどなど。
	- 評価実行のタイミングを作成、変更時、任意のタイミングにできる。
	- Lamda連携でCustomルール