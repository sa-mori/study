# SES.md
- メール受信機能追加
	- 受信したメールをトリガーにS3へ配信、Lambda読み出し、SNS通知などができる。
## 配信方法
- HTTP REST API
	- 認証はAWSアクセスキーとシークレットアクセスキー
- SMTPエンドポイント
	- 生成済Emailメッセージをリレーする。
	- 認証には専用IAMユーザを作成し、そのクレデンシャルを使用
## アクセスレベル
- サンドボックス
	- 指定されたアドレスにのみ配信可能
	- 小さな送信制限
- プロダクション
	- 送信先の制限なし
	- 送信制限は実績により変動

## 送信承認
- 異なるAWSアカウントまたはIAMユーザから当該アカウントのドメイン、Emailアドレスを使って送信する権限を許可

## Suppression List機能
- ハードバウンスしたEmailアドレスが登録されるリスト
- アカウントを超えて共有
- SESから外部へは配信されないリスト。

## SESでのコンテンツフィルタ
- SESはメールメッセージを組み立てたら、ISPがSpamとみなさないか、Header,Bodyをscanする。spamのように見えたらReputationを下げる。
- ウイルスやマルウェアを検出したら送信をブロックする。

## 参考情報
- Sendy
	- メールの作成から、SESでの配信、レポート作成をワンストップで実現するパッケージ。

## 受信機能
### SESのメール受信制限
- 受信者ベースの制御
- 送信元IPアドレスベースの制御
	- SESはスパムの送信元として知られているIPアドレスリストを保持。
	- EC2から送信されるすべてのメールはデフォルトでブロックのため、許可が必要。
### Eメールの暗号化
- S3クライアントサイド暗号化を使用してSESによって暗号化可能
- KMSキーを使って暗号化
- S3クライアントサイド複合化を使って複合が必要。
