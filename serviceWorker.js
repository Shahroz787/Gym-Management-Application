const staticDevCoffee = "Sheroo-Online-Gym"
const assets = [
  "/",
  "/index.html",
  "/gymform.html",
  "/gymDatacontact.html",
  "/gymEditData.html",
  "/login.css",
  "/gymData.css",
  "/gymDatacontact.css",
  "/gymform.css",
  "/login.js",
  "/gymData.js",
  "/gymDatacontact.js",
  "/gymform.js",
  "/assets//Gym logo.png",
  "/assets/gymbackground4.jpeg",
  "/assets/icon-48x48.png",
  "/assets/icon-72x72.png",
  "/assets/icon-96x96.png",
  "/assets/icon-128x128.png",
  "/assets/icon-144x144.png",
  "/assets/icon-152x152.png",
  "/assets/icon-192x192.png",
  "/assets/icon-384x384.png",
  "/assets/icon-512x512.png",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(staticDevCoffee).then(cache => {
      cache.addAll(assets)
    })
  )
})