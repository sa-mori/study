# Elastic Transcoder
- 動画ファイルのトランスコーダー
## 特徴
- サムネイル画像を生成機能
- ウォーターマークやキャプションの挿入
- プリセットによる変換形式の定義
- マルチフォーマットへの同時変換
- IAMによるアクセス管理、CloudTrailログ
- S3 server-side encryptionやKMSによるコンテンツ保護
- S3,SNSとの連携

## 用語
- Pipeline
	- トランスコードを実行する要求処理を管理
	- 複数用意して並列処理
	- S3 Bucketの管理
	- SNS通知設定
- Job
	- 各コンテンツのトランスコード処理を管理
	- Presetの指定による簡易変換
	- 変換元、先のファイル名指定
	- サムネイル生成指定
	- 変換元ファイルの詳細情報の設定
- Preset
	- デバイスに適した変換方式の設定パラメータを管理

## その他
- HLSv4/smooth streaming対応
- Pipeline作成時にKMSを指定
- S3+CloudfrontでHLS,SmoothStreaming,RTMPの配信が可能

## AWSサービスを使用したアーキテクチャ
- アップロードは Cognitoでの認証後、S3へ直接行う。
	- ex:facebook ID毎にディレクトリを作成。ディレクトリへの権限はそのIDを持つユーザのみとする。
- ElasticTranscoderを使うことでエンコード数の増減にも自動でスケール。
- DynamoDBで状態管理
- CloudFront/S3ともにSigned URLを発行する仕組みがあるため、SDKで簡単に限定URLのストリームができる
	- 