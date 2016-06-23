(function() {
  'use strict';

  window.deepSwInstance = null;

  var ServiceWorker = navigator.serviceWorker;

  if (ServiceWorker) {
    ServiceWorker
      .getRegistration('/')
      .then(function(swRegistration) {
        return swRegistration || ServiceWorker.register('/deep-worker.js', { scope: '/' });
      })
      .then(function(swRegistration) {
        window.deepSwInstance = swRegistration.installing || swRegistration.active;
      })
      .catch(function(error) {
        console.warn('Error while retrieving service worker instance ', error.message);
      });
  } else {
    console.warn('Sorry, not ServiceWorker feature, maybe enable it?');
    console.warn('http://jakearchibald.com/2014/using-serviceworker-today/');
  }
})();
