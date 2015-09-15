### How to add AgularJS module

**DeepNgRoot** automatically loads each bootstrap.js micro-service and attaches the angular module declared.

To connect your angular module you have to export the function with the name of the angular module as _default_.

The exported function must return _Promise_.

```javascript
export default function app() {
  return System.import('js/app/angular/index.js');
};
```
### Hooks

The functions exported by a third-party micro services are executed before load AngularJS and its modules .

**configLoad** - The function to load the settings for the remaining scripts. Performed first.

```javascript
export function configLoad() {
  return System.import('deep.core/js/config.core.js');
}
```

**loadFirst** - The function to load scripts before AngularJS.

```javascript
export function loadFirst() {
  let scripts = [
    Promise.resolve(System.import('stylesheets/main.min.css!')),
    Promise.resolve(System.import('jquery')),
    Promise.resolve(System.import('velocity')),
  ];

  return Promise.all(scripts);
}
```

### Dynamic page title

To set page title you have specify pageTitle parameter in the ui-router config as shown in example.

```javascript
.config(function($stateProvider, $urlRouterProvider) {
$urlRouterProvider.otherwise('/home');
$stateProvider
    .state('home', {
        url: '/home',
        templateUrl : 'views/home.html',
        data : { pageTitle: 'Home' }
    })
    .state('about', {
        url: '/about',
        templateUrl : 'views/about.html',
        data : { pageTitle: 'About' }
    })
});
```