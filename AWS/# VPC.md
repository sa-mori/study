# VPC.md
## ネットワークACL vs セキュリティグループ
- ネットワークACLはAllow/DenyをIN/OUTで指定可能
- ステートレスなので戻りのトラフィックも明示的に許可設定する
- サブネット内の全てのインスタンスが対象になる

## DNSサーバ
- Route53の設定とVPCでのDNS解決、DNSホスト名の設定

## オンプレとの接続
- VPN接続構成
	- 1つのVPN接続は2つのIPsecトンネルで冗長化
	- ルーティングは静的、動的が選択可能
	- オンプレ側にCGW(カスタマゲートウェイ)
- DX接続構成
	- 接続先はVPC(プライベートクラウド),AWSクラウド(パブリッククラウド)の2つ

## その他
- VPCエンドポイント for S3
	- Bucket、VPCエンドポイントと、ポリシー設定が必要
- NATゲートウェイ
- VPC Peering
	- 異なるAWSアカウント間も可能
	- 単一障害点や通信のボトルネックはない
	- リージョンは無理
	- VPC Peering先のセキュリティグループ指定が可能
- VPC Flow Logs
	- ネットワークトラフィックをキャプチャし、CloudWatch LogsへPublishする機能
	- RDS,ElastiCache,Redshift,Workspacesでもできる。
- ネットワーク環境を削除するには依存している設定を先に消す必要がある。