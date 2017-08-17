# Kinesis.md
- Streams(Kinesisといえばこれ。)
	- ストリーミングデータを処理・分析するためのアプリを構築
	- 3AZへ複製
	- ストリーム内のシャード数を増減することでスループットをコントロール
- Firehose
	- ストリーミングデータをS3,Redshift,ESへ流し込む
	- データストアとダイレクトに統合
	- シームレスにスケール
- Analytics
	- ストリーミングデータをSQLで分析

- SQSとの違い
	- Kinesisはスケールする。
	- SQSより低コスト。
	- SQSは256バイトのテキストデータのみ、Kinesisは50KBのBLOB。
	- SQSはシンプルにコマンドを入れる。Kinesisはデータそのものを入れる。