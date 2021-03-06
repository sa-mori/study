- EC2 Windows.md
	- ImportImage APIを使用した仮想マシンのインポート
		- Citrix XenServer,Microsoft Hyper-V,VMware vSphereなどの仮想環境からVMをAMIとしてインポート
		- サポートするイメージ形式
			- RAW/VHD/VMDK/OVA
		- ファイルシステムとボリュームタイプ
			- Windows:NTFSフォーマットされたMBRボリューム
	- 物理ホストの専有(DedicatedHost)
		- 物理ホストへのインスタンス配置が制御・確認可能
		- 物理ホスト単位のソフトウェアライセンスを持ち込み可能
		- 物理ホスト単位で課金
	- マイクロソフト環境の管理
		- AWS System Manager for Microsoft System Center Virtual Machine Manager(SCVMM)
			- EC2インスタンスの管理が可能
				- インスタンス作成・再起動・停止・削除など
			- RDPでのインスタンスへの接続
			- Hyper-Vのインポート
		- AWS Management Pack for Microsoft System Center
			- オンプレミスとAWSリソース両方をSystemCenterOperationsManagerから参照、監視できる。
				- EC2,EBS,ELB,CloudFormation,AutoScaling,ElasticBeanstalk
		- AWS Management Portal for vCenter
			- ｖCenterと統合
				- AWS管理画面として利用可能
				- VMWare VMの移行機能
				- 既存のADと統合したシングルサイオン
		- AWS Tools for Windows PowerShell
			- PowerShellの強力なシェル機能が利用できる
			- AWSPowerShellモジュール内のコマンドレットから、ほとんどのAWSサービスを操作可能
	- EC2 Run Command(Simple Systems Manager,SSM)
		- 実行中のEC2インスタンスをリモート操作
	- AWS DirectoryServiceドメインへの自動参加
	- AWS Diagnostics for Microsoft Windows Server
		- トラブルシューティングに役立つ様々なメトリックの収集が可能。

- EC2 Linux
	- AMIと仮想化方式
		- HVMの方向へ
		- VM Import/ExportはHVMのみ対応
		- 一部のCPU拡張命令はHVMのみ対応
		- PV⇔HVMの変換機能はない
- EC2のPublicIPレンジ
	- IPレンジが公開されているため取得できる。
	- 変更時にSNSで通知
- 拡張ネットワーキング
	- パケット毎秒が非常に大きく、ネットワークレイテンシが低くなる。
	- SR-IOVに対応
- PlacementGroups
	- インスタンス間通信を最適化
	- ノード間通信が大量発生するクラスタに最適
	- 単一AZに閉じる
- その他制限
	- 以下は申請が必要
	- ペネトレーションテスト
	- SMTP送信
- AWS Trusted Advisor
	- 不要リソースやアイドル状態のリソースを検出
	- リザーブドインスタンスの利用状況を可視化
	- SGの無制限公開ポートチェック、無制限アクセスチェック
	- 各種リソース上限の確認

- HPC
	- 計算向け
	- 高速I/O向け
	- 大容量ストレージ
	- HVM AMIを使用する
	- PlacementGroupを使用する
	- EMRでも選択可能
- スポットインスタンス(デフォルト)、永続スポットインスタンス(オプション)
	- 突然のターミネートが許容されるワークロードか？
	- スポットフリート
		- EC2スポットインスタンスを効率よく利用するためのユーザー支援＆スポット管理機能
	- スポットブロック
		- 指定した時間中はターミネートされない
	- スポットサーバ群がすべてターミネートしても保証できるようにASG(AutoScalingGroup)をつくる

- AutoScaling
	- インスタンス保護
- SnapshotCopy
	- Region内コピー、Region間コピー、の両方可能
	- EBS,MarketPlace,VMimport経由のAMI、StorageGatewayのスナップショット、RDS、Redshiftのスナップショット、AMIのコピー
- Ephemeral Diskの暗号化/冗長化
	- 暗号化
		- WindowsBitlocker
		- SecureCloud
		- SafeNetProtectV
		- CryptSetup
	- 冗長化
		- DRBD
		- ClusterPro
		- GlusterFS
		- RedhatStorageServer