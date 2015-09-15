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