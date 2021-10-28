const cacheName = "acts-cache-v1"
var staticAssets = [
    'assets/css/bootstrap.min.css',
    'assets/css/boxicon.min.css',
    'assets/css/custom.css',
    'assets/img/qr-code.png',
    'assets/img/man.png',
    'assets/js/ajax/login.js',
    'assets/js/ajax/qr-scan.js',
    'assets/js/bootstrap.bundle.min.js',
    'assets/js/bootstrap.min.js',
    'assets/js/feather.min.js',
    'assets/js/moment.min.js',
    'assets/js/jquery.easing.min.js',
    'assets/js/menu-animation.js',
    'assets/js/qr_packed.js',
    'assets/js/jquery-3.5.1.js',
    'assets/js/sweetalert.min.js',
    'views/pages/v2',
    'views/pages/v2/qr-scan.html',
    'views/pages/v2/img/apple-icon-180.png',
    'index.php',
    'index.js',
    'manifest.json',
    'sw.js',
]

self.addEventListener('install', function(event) {
    // Perform install steps
    console.log('Service Worker Registered');
    event.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(staticAssets);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Cache hit - return response
                if (response) {
                  return response;
                }
        
                return fetch(event.request).then(
                    function(response) {
                        // Check if we received a valid response
                        if(!response || response.status !== 200 || response.type !== 'basic') {
                          return response;
                        }
            
                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();
            
                        caches.open(cacheName)
                          .then(function(cache) {
                            cache.put(event.request, responseToCache);
                            // cache.addAll(staticAssets.map(function(staticAssets) {
                            //   return new Request(staticAssets, { mode: 'no-cors' });
                            // })).then(function() {
                            //   console.log('All resources have been fetched and cached.');
                            // });
                         });
            
                        return response;
                    }
            );
        })
    );
});

self.addEventListener('activate', function(event) {

    var cacheAllowlist = ['pages-cache-v1', 'acts-data-cache-v1'];
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                  if (cacheAllowlist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName);
                  }
                })
            );
        })
    );
});

async function cacheFirst(req){
    const cache = await caches.open(cacheName)
    const cached = await cache.match(req)
    return cached || fetch(req)
}

async function networkAndCache(req){
    const cache = await caches.open(cacheName)
    try
    {
        const fresh = await fetch(req)
        await cache.put(req, fresh.clone())
        return fresh
    }
    catch(e)
    {
        const cached = await cache.match(req)
        return cached
    }
}