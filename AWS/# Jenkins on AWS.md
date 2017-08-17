# Jenkins on AWS
## ポイント
- Jenkinsサーバの構成
	- Masterの設定を外出しして疎結合。
- ビルド処理のオフロード
	- Wokerにやらせる。
	- Spotfleetを使う
	- ECSをつかう
	- CodeBuild as Jenkins Worker
- AWSサービスとの連携
