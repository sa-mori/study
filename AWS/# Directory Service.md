# AWS Directory Service.md
## ActiveDirectoryドメインサービス
- 名前解決(DNS)
- ディレクトリサービス(LDAP)
- ユーザ認証(Kerberos ver5)
- クライアント管理(SMB:ファイル共有)

## AWS DirectoryService
- スタンドアロンのディレクトリを新規に作成
	- Simple AD
- 既存のAD認証を利用して、AWSアプリへのアクセス制御(Workspaces,WorkDocs,WorkMail,IAMロールによるコンソールログイン)
	- AD Connector
		- IAMロールをADユーザにアサイン。ADユーザはアクセスURL経由でログイン
- EC2(Windows)作成時にドメインを指定。起動後、ActiveDirectory管理ツールを入れるとディレクトリの管理が可能

- ADFS(Active Directory フェデレーションサービス)
	- セキュリティで保護されたID連携とWebシングルサインオンを提供
	- AD DS(DomainService)/AD LDS(Lightweight DomainService)で認証されたユーザに対してセキュリティトークンを発行(SAML 1.1/2.0)
	- Office365やGoogleAppsへのシングルサインオンにも利用される
	- ADFSとは。
		- ActiveDirectoryにサインインした後に生成されるチケットを元にクラウドで利用可能なチケットを生成するサービス。
- ベストプラクティス
	- VPCの構成
		- DCをMurti-AZに配置
			- GC(グローバルカタログサーバ)とDNSを各AZ配置。AZ障害に備える。
		- DCとインターネットに接続しないサーバはPrivateSubnet
		- RemoteDesktopGatewayをPublicSubnetへ。
	- バックアップ
		- Volume Shadow Copyサービス(VSS)により起動中にバックアップが可能
		- 