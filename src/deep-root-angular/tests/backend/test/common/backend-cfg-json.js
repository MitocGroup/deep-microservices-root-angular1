export default {
  'env': 'dev',
  'deployId': '12343ac',
  'awsRegion': 'us-east-1',
  'models': [],
  'identityPoolId': 'us-east-1:xxxxxxxx-xxxx-xxxx-xxxx-xx0123456789',
  'identityProviders': '',
  'microservices': {
    'deep-root-angular': {
      'isRoot': true,
      'parameters': {},
      'resources': {
        'async-config': {
          'dump': {
            'type': 'lambda',
            'methods': [
              'GET'
            ],
            'forceUserIdentity': false,
            'apiCache': {
              'enabled': false,
              'ttl': -1
            },
            'region': 'us-east-1',
            'scope': 'private',
            'source': {
              'api': null,
              'original': 'arn:aws:lambda:::function:deep-root-angular-async-config-dump',
              '_localPath': './src/deep-root-angular/backend/src/async-config/dump/bootstrap.js',
            },
          },
        },
        'scheduler': {
          'rule': {
            'type': 'lambda',
            'methods': [
              'GET',
            ],
            'forceUserIdentity': false,
            'apiCache': {
              'enabled': false,
              'ttl': -1,
            },
            'region': 'us-east-1',
            'scope': 'private',
            'source': {
              'api': null,
              'original': 'arn:aws:lambda:::function:deep-root-angular-scheduler-rule',
              '_localPath': './src/deep-root-angular/backend/src/scheduler/rule/bootstrap.js',
            },
          },
        },
        'ddb-eventual-consistency': {
          'pool-queue': {
            'type': 'lambda',
            'methods': [
              'GET',
            ],
            'forceUserIdentity': false,
            'apiCache': {
              'enabled': false,
              'ttl': -1,
            },
            'region': 'us-east-1',
            'scope': 'private',
            'source': {
              'api': null,
              'original': 'arn:aws:lambda:::function:deep-root-angular-ddb-eventual-consistency-pool-queue',
              '_localPath': './src/deep-root-angular/backend/src/ddb-eventual-consistency/pool-queue/bootstrap.js',
            },
          },
        },
      },
    },
  },
  'globals': {
    'favicon': '@deep-root-angular:img/favicon.ico',
    'storage': {
      'eventualConsistency': {
        'offloaderEndpoint': '@deep-root-angular:ddb-eventual-consistency:pool-queue',
      },
    },
    'pageLoader': {
      'src': '@deep-root-angular:img/loader.gif',
      'alt': 'Loading...',
    },
    'engine': {
      'ngRewrite': '/',
    },
  },
  'searchDomains': {},
  'validationSchemas': [],
  'modelsSettings': [],
  'forceUserIdentity': false,
  'microserviceIdentifier': 'deep-root-angular',
  'awsAccountId': 123456789012,
  'apiVersion': 'v1',
  'appIdentifier': 'f401e45654645cxzcz6891676f6953a2b44b6',
  'timestamp': 1467026134560,
  'buckets': {
    'temp': {
      'name': 'dfgfh575676jghjhgjhg6876876njhgjgjh-temp',
    },
    'public': {
      'name': 'dfgfh575676jghjhgjhg6876876njhgjgjh-public',
    },
    'private': {
      'name': 'dfgfh575676jghjhgjhg6876876njhgjgjh-private',
    },
    'shared': {
      'name': 'dfgfh575676jghjhgjhg6876876njhgjgjh-shared',
    },
  },
  'tablesNames': {},
  'cacheDsn': '',
  'name': 'deep-root-angular-async-config-dump',
  'path': './src/deep-root-angular/backend/src/async-config/dump/bootstrap.js',
};
