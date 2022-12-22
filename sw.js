//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache',
  urlsToCache = [
    './',
    'https://fonts.googleapis.com/css?family=Raleway:400,700',
    'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
    'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
    './script.js',
    'css/fontawesome-all.min.css',
    'css/noscript.css',
    'css/style.css',
    'img/img/normalogo.png',
    'img/img/home.jpg',
    'img/img/datos.jpg',
    'img/img/industrial.jpg',
    'img/img/autor.jpg',
    'img/img/penal.jpg',
    'img/img/estandares.jpg',
    'img/img/pfsense.jpg',
    'js/breakpoints.min.js',
    'js/browser.min.js',
    'js/jquery.min.js',
    'js/jquery.scrollex.min.js',
    'js/jquery.scrolly.min.js',
    'js/main.js',
    'js/pouchdb.min.js',
    'js/util.js',
    'pages/avisosprivacidad.html',
    'pages/codigopenal.html',
    'pages/datospersonales.html',
    'pages/derechosautor.html',
    'pages/propiedadindustrial.html',
    './php.html',
    './js.html',
    './python.html',
    './bd.js',
    './pouchdb.min.js',
    './push.min.js',
    './gps.js',
    './noti.js'
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//Estrategia cache First
//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recupera del cache
          return res
        }
        //recupera de la petición a la url
        return fetch(e.request)
      })
  )
})




