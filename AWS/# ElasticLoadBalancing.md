# ElasticLoadBalancing.md
## ALB
- Wobsocket、HTTP/2のサポート
- コンテントベースルーティング
	- パス部分のパターンでターゲットグループに振り分ける
	- ポートを分けることで同一インスタンス上でことなるアプリへ振り分ける
	- ALB作成後、リスナータブでリスナー(ポート)に対して設定
## ELB
- VPC配下に作成するが、複数のAZにまたがって高レベルの耐障害性
- 従来のELBはL4および、一部のL7機能を提供
- Internet-Facing ELB/Internal ELB
	- どちらでもDNSレコードはパブリックで解決可能
- SecurityGroup指定が可能。ICMP Echo Request/Replyを許可でpingにも応答
- SSL Terminationできる
	- サーバ証明書のアップロードが必須
	- AWS Certificate Manager(ACM)との統合
- スティッキーセッション
	- 同じユーザからリクエストは同じEC2へ送信
	- デフォは無効
	- ELBは独自のセッションCookieを挿入
- ConnectionDrainin
	- 切り離したEC2への処理中リクエスト終了までの期間
- 要注意事項
	- 処理が長くコネクションタイムアウト(デフォは60秒)で切られないこと。
	- ELBのスケーリングが間に合わないと503を返す
	- Websocketの場合、TCPセッションを持続的に専有するため、LBのリソース不足に注意
		- セッション確立(ディスパッチャ)時だけELBを使うのがよい。
	- AZをまたいだELBの偏りを無くすには。