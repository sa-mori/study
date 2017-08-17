# ElasticBeanStalk.md
## デプロイ方法
- マネジメントコンソール上から。
- AWS Toolkit for Eclipse/Visual Studio IDE
- EB Command Line Interface(EB CLI)
- デプロイの選択肢
	- Rolling Deploy
	- Rolling Updates(インスタンス丸ごと入れ替えていく)
	- Blue/Green(DNS)
- Dockerサポート
	- ECS Clusterをぶらさげられる。意味あるの？起動は早くなるが。。。
- Woker Tier
	- Sqsd
	- 定期的なタスク実行(cron.yaml)
- 証明書
  - Elastic Beanstalk 環境のロードバランサーで証明書を使用するには、AWS Identity and Access Management (IAM) に証明書とプライベートキーをアップロードします。