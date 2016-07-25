/* jshint undef: false */
/* eslint max-len: [1] */

'use strict';

var cacheId = 'deep-service-cache-<deep-hash>';
var CACHE_FLAG = '<script>window.DEEP_SW_CACHE_FLAG=true;</script>';

function getCache() {
  return caches.open(cacheId);
}

function HtmlPage(htmlPage) {
  this.htmlPage = htmlPage;

  this.injectDeepCache = function(deepCache) {
    this.htmlPage = this.htmlPage.replace(/(<html[^>]*>)[\s\S]+(<\/html>)/, '$1' + deepCache + '$2');

    return this;
  };

  this.clearNgJunkCode = function() {
    this.htmlPage = this.htmlPage.replace(
      /<style type="text\/css">@charset "UTF\-8";\[ng\\:cloak\],\[ng\-cloak\],\[data\-ng\-cloak\],\[x\-ng\-cloak\],\.ng\-cloak,\.x\-ng\-cloak,\.ng\-hide:not\(\.ng\-hide\-animate\)\{display:none !important;\}ng\\:form\{display:block;\}\.ng\-animate\-shim\{visibility:hidden;\}\.ng\-anchor\{position:absolute;\}<\/style>/g,
      ''
    );

    return this;
  };

  this.clearGtmJunkCode = function() {
    this.htmlPage = this.htmlPage.replace(
      /<script[^>]+www\.(googletagmanager|google-analytics)\.com[^>]+>\s*<\/script>/g,
      ''
    );

    return this;
  };

  this.ensureCacheFlag = function() {
    this.htmlPage = this.htmlPage.indexOf(CACHE_FLAG) !== -1 ?
      this.htmlPage :
      (this.htmlPage + CACHE_FLAG);

    return this;
  };

  this.toResponse = function () {
    return new Response(this.htmlPage, {
      status: 200,
      headers: {
        'Content-Type': 'text/html'
      }
    });
  };
}

this.addEventListener('fetch', function(event) {
  var request = event.request;

  var responsePromise = fetch(request)
    .then(function (response) {
      return getCache().then(function (cache) {
        return cache.match(request.url).then(function (cacheResponse) {
          if (!cacheResponse) {
            return response;
          }

          return cacheResponse.text().then(function (cachedHtmlPart) {
            var cloneResponse = response.clone();

            return cloneResponse.text().then(function (htmlPage) {
              // @todo: find smarter way to handle redirect requests
              htmlPage = htmlPage || '<html lang="en" class="">&nbsp;</html>';

              return new HtmlPage(htmlPage)
                .injectDeepCache(cachedHtmlPart)
                .ensureCacheFlag()
                .clearNgJunkCode()
                .clearGtmJunkCode()
                .toResponse();
            });
          });
        });
      });
    });

  event.respondWith(responsePromise);
});

this.addEventListener('activate', function(event) {
  var flushCacheStorage = caches.keys().then(function(keys) {
    var premises = keys.map(function(key) {
      return key !== cacheId && /^deep\-service\-cache/.test(cacheId) ?
        caches.delete(key) :
        Promise.resolve(true);
    });

    return Promise.all(premises);
  });

  event.waitUntil(flushCacheStorage);
});

this.onmessage = function(event) {
  var data = event.data;
  var key = data.key;
  var value = data.value;

  if (key && value) {
    getCache().then(function(cache) {
      cache.put(key, new Response(value));
    });
  }
};
