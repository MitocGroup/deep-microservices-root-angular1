'use strict';

var cacheId = 'deep-service-cache-<deep-hash>';
var CACHE_FLAG = '<script>window.DEEP_SERVICE_CACHE_FLAG=true;</script>';

function getCache() {
  return caches.open(cacheId);
}

function HtmlPage(htmlPage) {
  this.htmlPage = htmlPage;

  this.injectDeepCache = function(deepCache) {
    this.htmlPage = this.htmlPage.replace(/(<html[^>]+>)[\s\S]+(<\/html>)/, '$1' + deepCache + '$2');

    return this;
  };

  this.clearNgJunkCode = function() {
    this.htmlPage = this.htmlPage.replace(
      /<style type="text\/css">@charset "UTF\-8";\[ng\\:cloak\],\[ng\-cloak\],\[data\-ng\-cloak\],\[x\-ng\-cloak\],\.ng\-cloak,\.x\-ng\-cloak,\.ng\-hide:not\(\.ng\-hide\-animate\)\{display:none !important;\}ng\\:form\{display:block;\}\.ng\-animate\-shim\{visibility:hidden;\}\.ng\-anchor\{position:absolute;\}<\/style>/g,
      ''
    );

    return this;
  };

  this.ensureCacheFlag = function() {
    this.htmlPage = this.htmlPage.indexOf(CACHE_FLAG) !== -1
      ? this.htmlPage :
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
  }
}

this.addEventListener('fetch', function(event) {
  var responsePromise = fetch(event.request)
    .then(function (response) {
      return getCache().then(function (cache) {
        return cache.match(event.request.url).then(function (cacheResponse) {
          if (!cacheResponse) {
            return response;
          }

          return cacheResponse.text().then(function (cachedHtmlPart) {
            var cloneResponse = response.clone();

            return cloneResponse.text().then(function (htmlPage) {
              return new HtmlPage(htmlPage)
                .injectDeepCache(cachedHtmlPart)
                .ensureCacheFlag()
                .clearNgJunkCode()
                .toResponse();
            });
          });
        })
      })
    });

  event.respondWith(responsePromise);
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
