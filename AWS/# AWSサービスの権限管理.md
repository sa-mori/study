# AWSサービスの権限管理.md
1.中央管理型
- 各事業部門が互いに干渉しない権限の管理
  - EC2=タグによる権限管理
  - S3はリソースによる権限管理

2.セルフサービス型
- 各事業部がテンプレートから環境を作成。作成時にタグをつけるので制御できない。
  - AWSアカウントの分割
  - Service Catalogの利用。タグ付けを強制する。

3.認証委任型
  - 依頼元企業管理者
    - IAMポリシーの作成、編集
  - 委託先企業管理者
    - 自社のメンバを登録削除できる。
    - IAMユーザの作成、グループへの割り当て
  - 依頼元企業で事前にグループにIAMポリシーをアタッチ。
  - 委託先企業はIAMユーザは作成できるが、IAMグループの所属を設定する権限
    - ポリシーのアタッチ、デタッチは禁止しておく。
4.マネジメントコンソールへのアクセス権限
- 社内の認証機構を利用。
- ADFSとの連携
  - AD上のユーザグループとIAMロールがマッピングされる。
  - ADFS連携ではユーザはマネジメントコンソールのログインパスワードを持たない。
  