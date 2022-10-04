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
9. API Gatewayの初期化
10. インフラ更新のデプロイ

## 1. 前提
- [こちら](https://github.com/yokohama/kickstart#kickstart-1)で、aws cliのクレデンシャル情報がセットされている必要が有ります。
- [こちら](https://github.com/yokohama/kickstart-front#kickstart-front-3-1)で、firebaseの`projectId`を取得している必要が有ります。

- このチュートリアルでは新たに以下の編集を取得します。
| 参照名 | 使用箇所 | 取得方法 | ステータス |
| :--- | :--- | :--- | :--- |
| local APIGateway endpoint URL | front | awsコンソール / api gateway / state / prod |  |
| dev APIGateway endpoint URL | front | awsコンソール / api gateway / state / prod |  |
| prod APIGateway endpoint URL | front | awsコンソール / api gateway / state / prod |  |

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

- 成功するとこんな感じになります。
<img src="https://user-images.githubusercontent.com/1023421/193505698-0176358c-fc48-40ae-9d7c-c861bd7cfb97.png" width="400" />

## 9. API Gatewayの初期化
- このチュートリアルから始めた方は、[kickstart-cdk](https://github.com/yokohama/kickstart-api)でAPI Gatewayの初期化まで完了させてください。終わりましたら指示に従い、10のデプロイに進めます。

- [kickstart-cdk](https://github.com/yokohama/kickstart-api)から来た方は、[API Gatewayの初期化](https://github.com/yokohama/kickstart-api#kickstart-api-5-2)に戻り完了させてください。終わりましたら指示に従い、`10. インフラ更新のデプロイ`に進めます。

## 10. インフラ更新のデプロイ

### 1. ec2をaws上のlocalに追加してみる
- lib/kickstart-tack.tsに、以下のコードを追記して下さい。

```
$ diff --git a/lib/kickstart-stack.ts b/lib/kickstart-stack.ts

diff --git a/lib/kickstart-stack.ts b/lib/kickstart-stack.ts
index 4d90f2f..af9ebe8 100644
--- a/lib/kickstart-stack.ts
+++ b/lib/kickstart-stack.ts
@@ -181,5 +181,12 @@ export class KickstartStack extends cdk.Stack {
       description: props.targetEnv
     });
     api.root.addMethod("ANY")
+
+    new ec2.Instance(this, 'Instance1', {
+      vpc: this.vpc,
+      instanceName: `Ec2-${props.targetEnv}`,
+      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
+      machineImage: new ec2.AmazonLinuxImage()
+    });
   }
 }
```

### 2. diffコマンドでaws上の構成変更の確認
- 先程のコードの追記により、aws上でのインフラ構成の変更セットが確認できます。

```
$FIREBASE_PROJECT_ID=kickstart-1ce52 cdk diff KickstartStack-local                 

Including dependency stacks: EcrStack-local
Stack EcrStack-local
There were no differences
Stack KickstartStack-local
IAM Statement Changes
┌───┬───────────────────────────────┬────────┬────────────────┬───────────────────────────────┬───────────┐
│   │ Resource                      │ Effect │ Action         │ Principal                     │ Condition │
├───┼───────────────────────────────┼────────┼────────────────┼───────────────────────────────┼───────────┤
│ + │ ${Instance1/InstanceRole.Arn} │ Allow  │ sts:AssumeRole │ Service:ec2.${AWS::URLSuffix} │           │
└───┴───────────────────────────────┴────────┴────────────────┴───────────────────────────────┴───────────┘
Security Group Changes
┌───┬────────────────────────────────────────────┬─────┬────────────┬─────────────────┐
│   │ Group                                      │ Dir │ Protocol   │ Peer            │
├───┼────────────────────────────────────────────┼─────┼────────────┼─────────────────┤
│ + │ ${Instance1/InstanceSecurityGroup.GroupId} │ Out │ Everything │ Everyone (IPv4) │
└───┴────────────────────────────────────────────┴─────┴────────────┴─────────────────┘
(NOTE: There may be security-related changes not in this list. See https://github.com/aws/aws-cdk/issues/1299)

Parameters
[+] Parameter SsmParameterValue:--aws--service--ami-amazon-linux-latest--amzn-ami-hvm-x86_64-gp2:xxxxx {"Type":"AWS::SSM::Parameter::Value<AWS::EC2::Image::Id>","Default":"/aws/service/ami-amazon-linux-latest/amzn-ami-hvm-x86_64-gp2"}

Resources
[+] AWS::EC2::SecurityGroup Instance1/InstanceSecurityGroup Instance1InstanceSecurityGroup50841F79 
[+] AWS::IAM::Role Instance1/InstanceRole Instance1InstanceRoleBC4D05C6 
[+] AWS::IAM::InstanceProfile Instance1/InstanceProfile Instance1InstanceProfileC04770B7 
[+] AWS::EC2::Instance Instance1 Instance14BC3991D 
```
<a id="kickstart-ckd-10-3" />

### 3. 変更をaws上のlocalにデプロイする
```
$FIREBASE_PROJECT_ID=kickstart-1ce52 cdk deploy --require-approval never KickstartStack-local

# 成功するとこんな感じ

 ✅  EcrStack-local (no changes)

✨  Deployment time: 1.91s

Outputs:
EcrStack-local.ExportsOutputFnGetAttEcrF2C6ABFCArnB1FA55B1 = arn:aws:ecr:ap-northeast-1:xxxxx:repository/ecr-local
EcrStack-local.ExportsOutputRefEcrF2C6ABFC130D1B67 = ecr-local
Stack ARN:
arn:aws:cloudformation:ap-northeast-1:xxxxx:stack/EcrStack-local/f8de3970-427a-11ed-ab0f-061d01a901ef

✨  Total time: 5.31s

KickstartStack-local
KickstartStack-local: deploying...
[0%] start: Publishing xxxxx
[100%] success: Published xxxxx
KickstartStack-local: creating CloudFormation changeset...

 ✅  KickstartStack-local

✨  Deployment time: 263.52s

Outputs:
KickstartStack-local.ApiEndpoint4F160690 = https://fh3ao3lhll.execute-api.ap-northeast-1.amazonaws.com/prod/
Stack ARN:
arn:aws:cloudformation:ap-northeast-1:xxxxx:stack/KickstartStack-local/dc2d2c90-430c-11ed-b103-06eeb60d75c5

✨  Total time: 266.91s
```

### 4. ec2が追加されたことを確認する

```
$aws ec2 describe-instances --filter "Name=instance-state-name, Values=running" | jq '.Reservations[].Instances[].IamInstanceProfile.Arn'

# localが作成されている
"arn:aws:iam::xxxxx:instance-profile/KickstartStack-local-Instance1InstanceProfileC04770B7-bRnupRBOU3Dd"
```
<a id="kickstart-ckd-10-5" />

### 5. 変更をaws上のdevにデプロイする
```
$ git add .
$ git commit -m 'ec2追加'
$ git push origin development
$ git pull
```

<a id="kickstart-cdk-10-6" />

### 6. GitHub上でActionsが動き、aws上のdevスタックにデプロイが始まります。

<img src="https://user-images.githubusercontent.com/1023421/193759086-4a22f3da-2c8f-4aa4-80fd-ce22bda21780.png" widht="400" />

### 7. ec2がdevスタックに追加されたことを確認する
```
$ aws ec2 describe-instances --filter "Name=instance-state-name, Values=running" | jq '.Reservations[].Instances[].IamInstanceProfile.Arn'
"arn:aws:iam::xxxxx:instance-profile/KickstartStack-dev-Instance1InstanceProfileC04770B7-LQChub2Xg1Yg"
"arn:aws:iam::xxxxx:instance-profile/KickstartStack-local-Instance1InstanceProfileC04770B7-bRnupRBOU3Dd"
```

<a id="kickstart-ckd-10-8" />

### 8. 変更をaws上のprodにデプロイする
1. githubの、kickstart-cdkにアクセス
2. `Pull requests`をクリックして、`New Pull request`ボタンをクリック
3. mergeを、main <= developmentにセレクトボックスで選択
4. `Create pull request`ボタンをクリック

<img src="https://user-images.githubusercontent.com/1023421/193760354-f6cf8667-b82d-4b63-a17f-e1090a9181f0.png" width="400" />

5. Titleを入力して、`Create pull request`ボタンをクリック

<img src="https://user-images.githubusercontent.com/1023421/193761031-ddae623b-956a-4a17-ab51-032ea30d1ec7.png" width="400" />

6. `Merget pull request`ボタンをクリック
7. `Confirm merge`ボタンをクリック

<img src="https://user-images.githubusercontent.com/1023421/193761326-4bfdf6f5-86f7-4aef-a67d-cb94308927c7.png" width="400" />

### 9. GitHub上でActionsが動き、aws上のprodスタックにデプロイが始まります。
- [10-6](https://github.com/yokohama/kickstart-cdk#kickstart-cdk-10-6)同様に、GitHubのActionsからデプロイの進行の確認ができます。

### 10. ec2がprodスタックに追加されたことを確認する
```
$ aws ec2 describe-instances --filter "Name=instance-state-name, Values=running" | jq '.Reservations[].Instances[].IamInstanceProfile.Arn'
"arn:aws:iam::xxxxx:instance-profile/KickstartStack-dev-Instance1InstanceProfileC04770B7-LQChub2Xg1Yg"
"arn:aws:iam::xxxxx:instance-profile/KickstartStack-prod-Instance1InstanceProfileC04770B7-yysjMAivwvEW"
"arn:aws:iam::xxxxx:instance-profile/KickstartStack-local-Instance1InstanceProfileC04770B7-bRnupRBOU3Dd"
```

### 11. 追加したEc2を削除する
1. lib/kickstart-stack.tsから先程追加したコードを削除する。

```
$diff --git a/lib/kickstart-stack.ts b/lib/kickstart-stack.ts

index af9ebe8..4d90f2f 100644
--- a/lib/kickstart-stack.ts
+++ b/lib/kickstart-stack.ts
@@ -181,12 +181,5 @@ export class KickstartStack extends cdk.Stack {
       description: props.targetEnv
     });
     api.root.addMethod("ANY")
-
-    new ec2.Instance(this, 'Instance1', {
-      vpc: this.vpc,
-      instanceName: `Ec2-${props.targetEnv}`,
-      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
-      machineImage: new ec2.AmazonLinuxImage()
-    });
   }
 }
```

### 12. 変更をaws上のlocalにデプロイする
- [10-3](https://github.com/yokohama/kickstart-cdk#kickstart-ckd-10-3)を参照

### 13. 変更をaws上のdevにデプロイする
- [10-5](https://github.com/yokohama/kickstart-cdk#kickstart-ckd-10-5)を参照

### 13. 変更をaws上のprodにデプロイする
- [10-8](https://github.com/yokohama/kickstart-cdk#kickstart-ckd-10-8)を参照
