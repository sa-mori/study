# CloudWatch.md
## CloudWatch
- メトリクスデータの保持期間は2週間
- データの保管粒度は最短で1分間
- 課金状況をCloudWatch監視
- メンテナンスイベントの監視
	- Auroraは自前でAPIが必要だった。。。

## CloudWatchLogs
- LogsからElasticsearch Serviceへの連携が容易
- ログをS3へエクスポート
- ログをリアルタイムにKinesisへ連携

## CloudWatch Events
- 様々なイベントソースを選択
	- EC2のstates変更
	- スケジュール
	- API Call(CloudTrail連携)
	- console sign-in
	- AutoScaling
- 様々なターゲット
	- LambdaFunction
	- SNS Topic
	- Kinesis Stream
	- Built-in target
		- EBS,EC2