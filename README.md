![Digital Enterprise End-to-end Platform Microservices](https://github.com/MitocGroup/deep-microservices-helloworld/blob/master/src/DeepHelloWorld/Frontend/img/logo.png) DEEP Root AngularJS 
=====================

[![Build Status](https://travis-ci.org/MitocGroup/deep-microservices-root-angularjs.svg?branch=master)](https://travis-ci.org/MitocGroup/deep-microservices-root-angularjs)
[![Codacy Badge](https://api.codacy.com/project/badge/ef7c8d169940408dbeb10c634c8b4259)](https://www.codacy.com/app/MitocGroup/deep-microservices-root-angularjs)
[![Coverage Status](https://coveralls.io/repos/MitocGroup/deep-microservices-root-angularjs/badge.svg?service=github&t=eBt0EE)](https://coveralls.io/github/MitocGroup/deep-microservices-root-angularjs)

[Digital Enterprise End-to-end Platform](https://github.com/MitocGroup/deep-framework) (also known as DEEP) is low cost and low maintenance Platform-as-a-Service powered by abstracted services (also known as serverless environments) from AWS.

## Getting Started [![Join char on gitter.im](https://img.shields.io/badge/%E2%8A%AA%20gitter%20-join%20chat%20%E2%86%92-brightgreen.svg)](https://gitter.im/MitocGroup/deep-framework)

### How to add AgularJS module

**DeepNgRoot** is a root micro-service which provides [AngularJS](https://angularjs.org/) and [AngularUI Router](https://github.com/angular-ui/ui-router) module.

It automatically loads each bootstrap.js micro-service and attaches the angular module declared.

To connect your angular module you have to export the function with the name of the angular module as _default_.

> The exported function must return _Promise_.

```javascript
export default function moduleName() {
  return System.import('angular_module.js');
};
```
### Hooks

The functions exported by a third-party micro services are executed before load AngularJS and its modules .

> All hooks are optional

**configLoad** - The function to load the settings for the remaining scripts. Performed first.

> The exported function must return _Promise_.

```javascript
export function configLoad() {
  return System.import('deep.core/js/config.core.js');
}
```

**loadFirst** - The function to load scripts before AngularJS.

> The exported function must return _Promise_.

```javascript
export function loadFirst() {
  let scripts = [
    Promise.resolve(System.import('jquery')),
    Promise.resolve(System.import('velocity')),
  ];

  return Promise.all(scripts);
}
```

### Dynamic page title

To set page title you have specify pageTitle parameter in the ui-router config as shown in example.

```javascript
angular.module('moduleName').config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('/home');
$stateProvider
    .state('home', {
        url: '/home',
        templateUrl : 'home.html',
        data : { pageTitle: 'Home' }
    });
});
```


## How can I get involved? [![Join char on gitter.im](https://img.shields.io/badge/%E2%8A%AA%20gitter%20-join%20chat%20%E2%86%92-brightgreen.svg)](https://gitter.im/MitocGroup/deep-framework)

### Feedback

We are eager to get your feedback, so please use whatever communication channel you prefer:
- [github issues](https://github.com/MitocGroup/deep-microservices-root-angularjs/issues)
- [gitter chat room](https://gitter.im/MitocGroup/deep-framework)
- [deep email address](mailto:feedback@deep.mg)

### Contribution

This project is open source, and we encourage developers to contribute. Here below is the easiest way to do so:

1. [Fork](http://help.github.com/forking/) this repository in GitHub.
2. Develop the feature in your repository. Make one or more commits to your repository in GitHub.
3. Perform a [pull request](http://help.github.com/pull-requests/) from your repository back into original repository in GitHub.

Make sure you update `package.json` (or `deepkg.json`, depends on the use case) and put your name and contact information in contributors section. We would like to recognize the work and empower every contributor in creative ways :)

### Roadmap

Our short-to-medium-term roadmap items, in order of descending priority:

Feature | Details | Owner
--------|---------|------
Increase code coverage | To be updated | [@vcernomschi](https://github.com/vcernomschi)
Implement end-to-end testing | To be updated | [@vcernomschi](https://github.com/vcernomschi)

### Changelog

Changelog files are located in `/changelog` folder.
> See [CHANGELOG.md](https://github.com/MitocGroup/deep-microservices-root-angularjs/blob/master/CHANGELOG.md) for latest changelog.

### License

This repository can be used under the MIT license.
> See [LICENSE](https://github.com/MitocGroup/deep-microservices-root-angularjs/blob/master/LICENSE) for more details.

### Sponsors

This repository is being sponsored by:
> [Mitoc Group](http://www.mitocgroup.com)
