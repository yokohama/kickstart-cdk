#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';

import { TargetEnvType, RailsEnvType } from '../lib/types/TargetEnvType';

import { EcrStack } from '../lib/ecr-stack';
import { KickstartStack } from '../lib/kickstart-stack';

let targetEnv :TargetEnvType = 'local'
let dbUser :string = 'db_user'
let dbName :string = 'local_db'
let railsEnv: RailsEnvType = 'development'
let vpcSubnet = '10.0.0.0/24'

if (process.env.TARGET_ENV === 'dev') {
  targetEnv = 'dev'
  dbName = 'dev_db'
  vpcSubnet = '10.0.1.0/24'
}
if (process.env.TARGET_ENV === 'prod') {
  targetEnv = 'prod'
  dbName = 'prod_db'
  railsEnv = 'production'
  vpcSubnet = '10.0.2.0/24'
}

if (process.env.FIREBASE_PROJECT_ID == null) {
  throw new Error('FIREBASE_PROJECT_IDをセットして下さい。')
}

const app = new cdk.App();

const repository = new EcrStack(app, `EcrStack-${targetEnv}`, targetEnv)

// cdk ls
new KickstartStack(app, `KickstartStack-${targetEnv}`, {
  targetEnv, 
  railsEnv, 
  repository: repository.repo,
  vpcSubnet,
  dbName, 
  dbUser
})
