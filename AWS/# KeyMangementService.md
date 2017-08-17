# AWS KeyMangementService.md
- 通信の暗号化
	- SSL/TLS
	- IPSec
	- 無線LAN暗号化
- 保管データの暗号化
	- ファイルの暗号化
	- 暗号化ファイルシステム
	- データベース暗号化
	- ブロックデバイス暗号化
- 可用性、物理的セキュリティ、ハードウェアの管理をAWSが担当するマネージドサービス
- 暗号化キーを保存および、使用するための安全なロケーションを提供
- S3,EBS,Redshift等のサービスと統合
- SDKとの連携でアプリ側のデータも暗号化可能
- 暗号鍵はリージョン単位で作成
- 暗号鍵の削除は7-30日の待機期間を経て、削除される。キャンセル可能。

## 用語
- CMK(CustomerMasterKey)
- CDK(CustomerDataKey)
	- CMKから生成される暗号鍵
- DataKeyでデータを暗号化し、DataKeyはCMKによって暗号化される

## 鍵のポリシー
- 暗号鍵に付与されたリソースベースのパーミッション、IAM User/Roleに付与したユーザベースのパーミッションの両方を評価。
- Grant
	- 鍵(CMK)の利用権限を他の人に委任するための機能
- Encryption Context
	- おまけの認証データ
	- 暗号化機能を利用するとき、Key/Valueペアを必要にする
	- ただし、CloudTrailのログには平文に出るのでパスワード的なものは使わないこと


## 暗号化処理
- KMSホスト
	- ユーザのリクエストを受け、HSA経由で処理
- HSA
	- 鍵の生成、利用、データの暗号化/復号化にかかる機能
- 暗号化方式
	- Client-side encryption
		- SDKでアプリ側でやる
	- Server-side encryption
		- AWSサービスとインテグレーションしたもの
		- S3,EBS,RDS,Redshift,Workspaces,WorkMail,CloudTrail,SES,ElasticTranscoder,Import/Export Snowball,Kinesis Firehose,EMR
## TIPS
- 直接暗号化/複合できるデータは4KBまで
- APIリクエストのスロットリングに注意。同時制限。
- 対象鍵暗号方式(共通鍵暗号)のみサポート。公開鍵暗号方式では利用できない。
- リージョン間での鍵共有はできない。
- サービスデフォルトキー
	- AWSが管理する各サービスのデフォルトキー
	- ポリシーの定義等、鍵に対するアクセス権の変更は不可

### EBS,RDSでのTIPS
- 生成時にCMKを指定。生成後に暗号化することはできない。
- 暗号化されたスナップショットを他のAWSアカウントに渡せるが、リージョン間コピーはできない。
