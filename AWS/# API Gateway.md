# API Gateway.md
## メリット
- レスポンスをキャッシュ可能
- CloudFrontを利用したレイテンシの軽減とDDos対策
- iOS,AndroidとJavaScript向けSDKの自動生成
- Swagger(REST APIを記述するための仕様)のサポート
- Request/Responseにおけるデータ変換

## カスタムドメイン
- エンドポイントとしてカスタムドメインを用いてAPI提供が可能
	- SSL証明書を用意し、API Gatewayにアップロードする。
	- 利用しているDNSにDistribution Domain Nameに対するCNAMEとして登録する。
- API全体だけでなく、特定環境のみをカスタムドメインで提供することも可能

## APIキー
- API Gatewayが払い出すAPIキーを利用したメータリングが可能
- あくまでも計測目的とし、認証目的で利用しないこと。

## 利用可能な認証方式
- AWS SignatureVersion4(Sig4)
	- IAMユーザのクレデンシャル情報を使用してリクエストに署名を行う
	- Cognito,STSのようなテンポラリクレデンシャルを利用する。
	- 生成されたクライアントSDKを利用する場合は自動的に利用可能
- Customer Authorizer
	- OAuthやSAMLなどのベアラートークンを用いてAPIへのアクセスを管理
	- Lambdaファンクションを用いてバックエンド呼び出し前にAuthorizationヘッダの値(トークン)を検証
- Cognito User Pools

## マッピングテンプレート
- リクエストやレスポンスのデータを別の形式に変換可能
- マッピングはVTL(Velocity Template Language)及びJSONPathで定義
- 以下のようなユースケースで利用
	- レガシーなバックエンドからのレスポンスをフィルタし、余計な情報を削除
	- GETリクエストのクエリストリングを元にPOSTのボディを生成して、POSTでバックエンドへ。
	- JSONで受け取ったものをXMLに変換