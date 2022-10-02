# kickstart-cdk

## 目次
1. 前提
2. FirebaseのプロジェクトIDの確認
3. github actionsのsecretesの登録
4. local環境（aws上）の環境構築
5. local（aws上）にインフラをデプロイ
6. インフラ変更のデプロイ

## 1. 前提
前提として[こちら](https://github.com/yokohama/kickstart#kickstart-1)で、aws cliのクレデンシャル情報がセットされている必要が有ります。

## 2. FirebaseのプロジェクトIDの確認
- kickstart-frontを構築していない方は先に、[こちら](https://github.com/yokohama/kickstart-front)でフロントの構築をしてください。
- 既にフロントの構築をされている方も、[こちら](https://github.com/yokohama/kickstart-front/blob/development/README.md#kickstart-front-3-1)で確認をして控えておいてくだい。

<img src="https://user-images.githubusercontent.com/1023421/193443389-b613c4b2-2148-4210-8c4b-f6515a4222b3.png" width="400">

## 3. github actionsのsecretsの登録

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

## 3. ローカル開発環境の構築
```
$ cd ./kickstart-cdk
$ yarn

$ cdk --verion
2.44.0 (build bf32cb1)
```

## 4. local環境（aws上）の環境構築
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

## 5. local（aws上）にインフラをデプロイ
```

# local(aws上)のECRにリポジトリを作成
$ FIREBASE_PROJECT_ID=＜2で確認したプロジェクトID＞ cdk deploy EcrStack-local

$ FIREBASE_PROJECT_ID=＜2で確認したプロジェクトID＞ cdk deploy KickstartStack-local
# (y/n)と聞いてくるので、yを選択。
```

## 6. インフラ変更のデプロイ
