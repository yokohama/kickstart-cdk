# kickstart-cdk

## 目次

## 1. 前提
前提として[こちら](https://github.com/yokohama/kickstart#kickstart-1)で、aws cliのクレデンシャル情報がセットされている必要が有ります。

## 2. FirebaseのプロジェクトIDの確認
[こちら](https://github.com/yokohama/kickstart-front/blob/development/README.md#kickstart-front-3-1)で確認をして控えておいてくだい。
## 3. ローカル開発環境の構築
```
$ cd ./kickstart-cdk
$ yarn

$ cdk --verion
2.44.0 (build bf32cb1)
```

## 3. local環境（aws上）の環境構築
```
$ FIREBASE_PROJECT_ID=＜2で確認したプロジェクトID＞ cdk ls
```
