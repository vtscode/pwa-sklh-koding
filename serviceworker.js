// penamaan memakan versi jika ada update jadi mudah di debug
var CACHE_NAME = 'my-site-cache-v1';

// ini daftar file2 statis yg mau di cache
var urlsToCache = [
  '/',
  '/fallback.json',
  '/css/main.css',
  '/js/jquery.min.js',
  '/js/main.js',
  '/images/logo.png'
];


//   ketika sw kita install maka akan menjalankan fungsi waitUntil
//   waitUntil artinya akan menjalan setelah didlmnya sudah di diselesaikan 
// (promise)


self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('in install serviceworker... cache Opened!');
        // memasukkan daftar  urlsToCache di func addAll()
        return cache.addAll(urlsToCache);
      })
  );
});


  // Kita meresponse dari event nya

self.addEventListener('fetch', function(event) {

  var request = event.request;
  var url = new URL(request.url);
  console.log(request);
  console.log(url);

  if(url.origin === location.origin){
    event.respondWith(
      caches.match(request).then(function(response){
        return response || fetch(request);
      })
    );
  } else {
    event.respondWith(
      caches.open('products-cache').then(function(cache){
        return fetch(request).then(function(liveResponse){
          cache.put(request,liveResponse.clone());
          return liveResponse;
        }).catch(function(){
          return caches.match(request).then(function(response){
            if(response) {return response}
            return caches.match('/fallback.json');
          });
        });
      })
    );
  }

  // event.respondWith(
  //   caches.match(event.request)
  //     .then(function(response) {
  //       // jika ada maka Cache hit - return response
  //       if (response) {
  //         return response;
  //       }
  //       // jika tidak maka akses ke url
  //       return fetch(event.request);
  //     }
  //   )
  // );
});




  // Activate ini ter-fired jika halaman di close 
  // misal ada service worker baru kita mau hapus sw yg lama
  

self.addEventListener('activate', function(event) {
  // membuat white list(yg dibolehkan)
  // var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        // dilooping satu satu
        cacheNames.filter(function(cacheName){
          return cacheName != CACHE_NAME
        }). map(function(cacheName) {
          // jika tidak ada di whitelist maka kita akan delete
          // if (cacheWhitelist.indexOf(cacheName) === -1) 
            return caches.delete(cacheName);
        })
      );
    })
  );
});
















