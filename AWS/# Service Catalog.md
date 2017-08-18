# Service Catalog.md
- 様々な利用者、組織の要請に対し、管理要件を満たしながら迅速に環境を提供することができる。
- 利用者はカタログから選択するだけで速やかな立ち上げができる。

## 構成概念
- 製品
	- インポートされたCloudFormationテンプレート
	- 1つまたは複数のAWSリソースから構成
- ポートフォリオ
	- 製品とその設定情報のコレクション
- 制約
	- テンプレート制約
	- 起動制約
- IAM
	- IAMを使用してカタログにアクセスできるユーザを制御

## オペレーション
1. 管理者が枠となるポートフォリオを作成
2. ポートフォリオにCloudFormationからなる製品を作成
3. 制約を追加し、アクセス権を付与
4. 利用者が製品を参照、起動
5. デプロイ