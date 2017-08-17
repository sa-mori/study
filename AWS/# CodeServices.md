# CodeServices.md
## AWS Codeシリーズ
- Code Pipeline
	- 全体統括
- Code Commit
	- Source
	- 送信時、保存時に暗号化
	- GitオブジェクトはS3で管理
	- GitインデックスはDynamoDBで管理
	- 暗号化キーはKMSで管理
- Code Build
	- Build
	- Test(ThirdPartyTool+Code Build)
	- ビルド環境を持ち込み可能(必要なツールを含むDockerイメージの作成)
	- Jenkinsプラグイン
	- Unitテストは受け持つ
- Code Deploy
	- Production
	- １台ずつ、半分ずつ、全て一度に。
