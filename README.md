ut.code();基幹システム開発パッケージ
===
## ディレクトリ構成
* data

    本番・開発時共にコンテナの可変データを格納するために使用。バージョン管理しない。

* dev

    開発用ファイルを格納。ソースコード等。開発時はvolumeを利用してコンテナと同期。

* dev/{something}/release.sh

    `dev`から`release`へ必要なファイルのみをコピーするスクリプト。ルートの`release.sh`から自動的に呼ばれる。

* release

    本番環境にアップロードするファイル一式。

* release/{something}/src

    devのソースコードがコンパイルされてできるファイル一式。バージョン管理しない。

* release.sh

    `dev`から`release/{something}/release`にコンパイル済みソースコードをコピーするためのスクリプト。

* Vagrantfile

    `release`の本番用環境に限りなく近づけたステージング環境と、テスト用クライアントを起動するための仮想環境。