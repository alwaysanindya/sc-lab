const CACHE_NAME = 'sclab-v1'
const PRECACHE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './images/logos/iitkgp_logo.png',
  './images/logos/crtdh_logo.png',
  './images/oroscan/optical1.jpeg',
  './images/oroscan/optical2.jpeg',
  './images/oroscan/thermal1.jpeg',
  './images/oroscan/thermal2.jpeg',
  './images/hemocube/hemocube1.jpeg',
  './images/hemocube/hemocube2.jpeg'
]

// Install — precache app shell + demo images
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS)
    }).then(() => self.skipWaiting())
  )
})

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    }).then(() => self.clients.claim())
  )
})

// Fetch — network-first for navigation, cache-first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event

  // Skip non-GET requests
  if (request.method !== 'GET') return

  // Navigation requests — network first, fallback to cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('./index.html'))
    )
    return
  }

  // Assets — cache first, fallback to network + cache
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached
      return fetch(request).then((response) => {
        // Cache valid responses
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        }
        return response
      })
    }).catch(() => {
      // Offline fallback for images
      if (request.destination === 'image') {
        return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#94a3b8">Offline</text></svg>', {
          headers: { 'Content-Type': 'image/svg+xml' }
        })
      }
    })
  )
})
