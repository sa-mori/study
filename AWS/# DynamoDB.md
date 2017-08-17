# DynamoDB.md
- プロビジョンドスループット
	- テーブルごとにRead/Writeそれぞれに必要なぶんだけのスループットキャパシティを割り当てる
	- オンラインで変更可能
- ストレージの容量制限がない
- 料金
	- プロビジョンスループット
	- ストレージ利用量
- オペレーションはHTTPベースのAPI
- テーブル操作について(ポイント)
	- Query
		- Hash KeyとRange keyの複合条件にマッチするアイテム群を取得
	- BatchGet
		- 複数のプライマリキーを指定してマッチするアイテム群を取得
	- Scan
		- テーブルを総なめ
- JSONサポート
	- パーティショニングはDynamoDBがよろしくやる。
- プライマリーキーの持ち方は2種類
	- Hash key
	- Hash Key + Range Key
- key以外のAttributeに対する定義はいらない。

- LSI/GSI
	- スループット、ストレージ容量を追加で必要とする
	- LSI
		- RangeKey以外に絞り込み検索で使えるKeyを作れる
		- Hash Keyが同一で、たの検索条件に使う場合に利用。
	- GSI
		- Hash Keyをまたいで検索を行うためのインデックス
		- Indexへは非同期アップデート。
- 高度なテーブルへのオペレーション
	- ConsistentReadによる強い一貫性を求めた読み込み
	- Conditional Write
		- キーにマッチするレコードが存在したら/しなかったら、この値がXX以上等の条件付けで書き込み/更新ができる。

## DynamoDB Stream
- DynamoDBへの変更履歴を保持し、取り出し可能。24時間。
- シリアライズされる。
- SDK,CLI,KinesisClientLibraryで読み出し。
- クロスリージョンレプリケーションができる。

## DynamoDB Triggers
- DynamoDB+Lambda

## FGAC(FineGrainedAccessControl)
- DynamoDBとIAMの統合により、テーブルの所有者は誰がどの項目に何ができるのかを指定できる。

## オブジェクトマッパークライアント

## アクセスコントロール
- IAMでのアクセス権
	- ウェブ ID フェデレーションは、モバイルアプリの Login with Amazon、Facebook、Google などの ID プロバイダーの使用を可能にします。
