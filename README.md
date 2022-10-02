# kickstart-cdk

## 目次
1. 前提
2. リポジトリをforkする
3. FirebaseのプロジェクトIDの確認
4. github actionsのsecretesの登録
5. ローカル開発環境の構築
6. CDKの初期化
7. aws上にECRのリポジトリ( local / dev / prod )作成
8. インフラ変更を構築する

## 1. 前提
- [こちら](https://github.com/yokohama/kickstart#kickstart-1)で、aws cliのクレデンシャル情報がセットされている必要が有ります。
- [こちら](https://github.com/yokohama/kickstart-front#kickstart-front-3-1)で、firebaseの`projectId`を取得している必要が有ります。

## 2. リポジトリをforkする
### 1. githubからforkする。
fork先名は解りやすく同じ名前にして下さい。もし変更する場合は、以降`kickstart-cdk`を`変更した名前`に読み替えて作業をおこなって下さい。

### 2. forkした先のリポジトリに、`development`ブランチを作成して下さい。

## 3. FirebaseのプロジェクトIDの確認
- kickstart-frontを構築していない方は先に、[こちら](https://github.com/yokohama/kickstart-front)でフロントの構築をしてください。
- 既にフロントの構築をされている方も、[こちら](https://github.com/yokohama/kickstart-front/blob/development/README.md#kickstart-front-3-1)で確認をして控えておいてくだい。

<img src="https://user-images.githubusercontent.com/1023421/193443389-b613c4b2-2148-4210-8c4b-f6515a4222b3.png" width="400">

## 4. github actionsのsecretsの登録

### 1. Secretsの登録画面を開く
<img src="https://user-images.githubusercontent.com/1023421/193443783-c0d0a453-1b85-4d82-b30a-6068658a21d7.png" width="400">

<img src="https://user-images.githubusercontent.com/1023421/193443820-4288a0f3-10ed-4bfa-824e-e80916ff38a8.png" width="400">

### 2. 以下の内容で変数を入力する
| 変数名 | 参照名 |
| :--- | :--- |
| AWS_ACCESS_KEY_ID | [こちら](https://github.com/yokohama/kickstart/blob/main/README.md#kickstart-1-11) |
| AWS_SECRET_ACCESS_KEY | [こちら](https://github.com/yokohama/kickstart/blob/main/README.md#kickstart-1-11) |
| AWS_REGION | [こちら](https://github.com/yokohama/kickstart/blob/main/README.md#kickstart-1-11) |
| FIREBASE_PROJECT_ID | [こちら](https://github.com/yokohama/kickstart-front/blob/development/README.md#kickstart-front-3-1) |

<img src="https://user-images.githubusercontent.com/1023421/193444810-92fcf0af-ae76-48bd-a408-b4019db6d1b9.png" width="400">

## 5. ローカル開発環境の構築
```
$ cd ./kickstart-cdk
$ yarn

$ cdk --verion
2.44.0 (build bf32cb1)
```

## 6. CDKの初期化
```
# cloud formationのスタックの初期化
$ FIREBASE_PROJECT_ID=＜2で確認したプロジェクトID＞ cdk bootstrap

#
# cloud formationのlocalスタックの確認
#

$ FIREBASE_PROJECT_ID=＜2で確認したプロジェクトID＞ cdk ls
EcrStack-local
KickstartStack-local
```

## 7. aws上にECRのリポジトリ( local / dev / prod )作成
- プロジェクトIDは[こちら](https://github.com/yokohama/kickstart-front#kickstart-front-3-1)で確認
```
# local(aws上)のECRにリポジトリを作成
$ FIREBASE_PROJECT_ID=＜プロジェクトID＞ cdk deploy EcrStack-local

# dev(aws上)のECRにリポジトリを作成
$ TARGET_ENV=dev FIREBASE_PROJECT_ID=＜プロジェクトID＞ cdk deploy EcrStack-dev

# prod(aws上)のECRにリポジトリを作成
$ TARGET_ENV=prod FIREBASE_PROJECT_ID=＜プロジェクトID＞ cdk deploy EcrStack-prod

```

<a id='kickstart-cdk-8' />

## 8. インフラを構築する
### 1. サーバーimageを用意する。
- 以降のインフラ構築の作業を進めるためには、awsのECR上にサーバーimageが存在することが前提となりますので、まずは[こちら](https://github.com/yokohama/kickstart-server)のサーバーimageのアップロードの作業を完了させて、指示通りにこちらに戻ってきてください。

<a id='kickstart-cdk-8-2' />

### 2. インフラを構築する
- プロジェクトIDは[こちら](https://github.com/yokohama/kickstart-front#kickstart-front-3-1)で確認
```
# awsのlocal環境にインフラを構築
$ FIREBASE_PROJECT_ID=＜プロジェクトID＞ cdk deploy KickstartStack-local
# (y/n)と聞いてくるので、yを選択。

# awsのdev環境にインフラを構築
$ FIREBASE_PROJECT_ID=＜プロジェクトID＞ TARGET_ENV=dev cdk deploy KickstartStack-dev
# (y/n)と聞いてくるので、yを選択。

# awsのprod環境にインフラを構築
$ FIREBASE_PROJECT_ID=＜プロジェクトID＞ TARGET_ENV=prod cdk deploy KickstartStack-prod
# (y/n)と聞いてくるので、yを選択。
```
