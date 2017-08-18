# OpsWorks.md
- Chefベースなのでエージェントは必要。OpsWorksエージェントがOpsWorksと通信。
- OpsWorksではリージョンを選択しない。

## 構成
- スタック
	- 属する全インスタンスの構成管理
	- 構成情報をJSONで保持
	- スタックをリージョン間でもコピー可能
- レイヤー
	- AWSリソースそれぞれの構成	
		- ELBレイヤー
		- APPサーバレイヤー
		- DBレイヤー
	- インスタンスの構築情報
- レシピ
	- APP
		- 様々なリポジトリをサポート(Git,HTTP archive,S3)
		- CodePipelineを使ってChefクックブックとアプリケーションコードのデプロイを自動化
## Chef Automate
- Chefサーバ、Chefクライアントの構成

## 可視性
- オペレーション、コンプライアンス、およびワークフローのイベントを可視化

## 自動復旧機能
- エージェントとサービス間の通信が途絶えると自動的にインスタンスの停止、再起動を実行する。