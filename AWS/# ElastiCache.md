BlackBlet[ElastiCache].md

## for Redis
- Mulit-AZ配置での自動FOに対応
- snapshotベースでのバックアップリスト機能に対応
- リードレプリカ＆リードレプリカ昇格
    - Multi-AZが有効になっている場合、一度、無効にする必要がある。
- マスターノードのスケールアウトはできない

### Redis to ElastiCache for Redis
- S3に保存したRDBファイルをElastiCacheへ移行
- バックアップ＆リストアで有効

### AOF（Append-Only-Files）
- 受信した全操作をローカルストレージ上のAOFに追記
- reboot時にキャッシュデータの復元が可能
- ノード障害でノード入れ替えが起きたら、アウト

## for memcached
- スケールアウトできる
-  Mulit-azできない。
- AutoDiscovery用のライブラリ
  - AWSから提供
  - ノードの追加、削除を検知


## Consistent Hasing
- キャッシュクラスタのスケールアウト時にあたらしいノードにも最適にキャッシュを分散させる。
- 実装方法
    - クライアントライブラリで実装
    - サードパーティソフト（Twemproxyとか）で実装
        - この場合はTwemproxyがSPOFにならない工夫が必要
