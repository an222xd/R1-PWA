//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache',
  urlsToCache = [
    './',
    'https://fonts.googleapis.com/css?family=Raleway:400,700',
    'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
    'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.min.js',
    'https://fonts.googleapis.com/css2?family=Poppins&display=swap',
    'https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap',
    './script.js',
    'css/fontawesome-all.min.css',
    'css/noscript.css',
    'css/style.css',
    'css/index.css',
    'js/breakpoints.min.js',
    'js/browser.min.js',
    'js/jquery.min.js',
    'js/jquery.scrollex.min.js',
    'js/jquery.scrolly.min.js',
    'js/main.js',
    'js/pouchdb.min.js',
    'js/util.js',
    'js/index.js',
    'js/pace.js',
    'js/bez.js',
    'music/killmonger.mp3',
    'music/killmonger.ogg',
    'music/old-town-road.mp3',
    'music/old-town-road.ogg',
    'music/The Weeknd - Blinding Lights (Lyrics).mp3',
    'music/The Weeknd - Blinding Lights (Lyrics).ogg',
    './php.html',
    './js.html',
    './python.html',
    './bd.js',
    './pouchdb.min.js',
    './push.min.js',
    './gps.js',
    './noti.js',
    './about-one.html',
    './blog-one.html',
    './blog-single.html',
    './contact-one.html',
    './index.html',
    './songs-one.html'
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




