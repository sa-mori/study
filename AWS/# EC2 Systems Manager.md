# EC2 Systems Manager.md
- EC2またはオンプレミスで実行されるWindows,Linuxに対してシステムの自動構成と継続的な管理ができる

## Systems Managerの構成要素
### Run Command
- 管理作業をリモートから実行できる。
- JSONベースのドキュメントでコマンド、タスクを定義
- 定義済みのドキュメントも提供、コミュニティ版もあり。
- 実行結果はS3に保存可能。SNS,通知もあり。
- SSH,RDPを使っていないので、これらを閉じることもできる。

### State Manager
- OSとアプリの設定を定義して状態を維持する。
- サーバ個別、タグで管理。
- 起動後でも定義した状態に管理可能。

### Automation
- シンプルなワークフローを使って一般的なタスクを自動化
- AMIからEC2を起動→パッチ適用→更新されたAMIを作成

### Parameter Store
- IT資産の集中管理
- ログイン、DB接続情報などを一元管理
- Run Command,State Manager, Automationから参照可能
- 細かい権限管理

### Maintenance Window
- 事前に設定した時間でメンテナンスを実施
- 考え方はRDSと同様、EC2版。

### Inventory
- ソフトウェアインベントリの情報を収集、管理
- AWS Configを有効にすることでインベントリ情報の変更履歴を追跡

### Patch Manager
- ベースラインを定義して、Windowsのパッチを適用
- 重要なアップデートやゼロでい脆弱性への対応を自動化、時間を短縮

### SSM Agent
- 管理対象に常駐して、各種サービスからの要求を受けて実行


