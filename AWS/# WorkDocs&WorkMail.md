# WorkDocs&WorkMail.md
## WorkDocs
- ファイルの共有
- マルチデバイスからのアクセス
- フィードバック
	- 共有されたドキュメントにコメントやメッセージで相互フィードバック。メールによる通知もできる。
### 概要
- 安全
	- 暗号化
	- アクセス権の管理
	- どこのリージョンに置くのか選択
	- 監査ログ
- コーポレートディレクトリと統合
	- ADと統合できる
- 低コスト
- 簡単アクセス
	- WebブラウザがあればOK
	- WorkDocsアカウントがないユーザは共有リンクからはアクセスできない。
	- モバイル向けにはアプリもある。
- 自動で世代管理
- バックグラウンドで同期ツールを提供

### ユースケース
- ファイル共有
- 個人のバックアップ領域

### ユーザ認証
- AWS Active Directory Serviceを利用する。既設のADとの連携以外に独立したドメインを立てることも可能。
- AD ConnectorではRADIUSサーバ連携によりMFAをサポート。


## WorkMail
- Emailやカレンダー、会議室等のリソース予約のインフラ
- ADとの統合
- Outlookとの互換性
### 概要
- マルチデバイスのサポート
- ウェブクライアント
- 低コスト

### MigrationTool
- MicrosoftExchangeからWorkMailへの移行を支援するツール