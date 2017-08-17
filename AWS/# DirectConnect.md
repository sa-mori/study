# DirectConnect.md
- プライベート接続
	- BGPによりルーティング
	- AWS側にVirtualGateway
- パブリック接続(自前のパブリックIPを利用/AWSのパブリックIPを利用)
	- BGPによりルーティング

## 冗長構成
- VPC上のVPG(VirtualPrivateGateway)に複数のDXまたはVPN接続を終端可能
- DXを２台でActive／Activeにしたり。
- DX+予備回線でVPN

## その他
- VPC PeeringはVPCをまたいで向こう側に行けない。

Q: AWS Direct Connect と VPN 接続を同時に同じ VPC に使用することはできますか?

A: はい。ただし、フェイルオーバーシナリオのみで可能です。Direct Connect パスが確立されると、AS パスプリペンドに関係なく、常に Direct Connect パスが優先されます。
ただし、DXが優先されるのはあくまでも、プレフィクス長を含めた同じ宛先サブネットの場合であり、プレフィックス長が異なる場合にはロンゲストマッチが有効なようです。