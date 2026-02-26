const mycache = "mypwa-app-v1";
const myfiles = [
  "./", // Changed to relative path
  "./index.html",
  "./manifest.json",
  "./favicon.ico",
  "./logo-192.png"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(mycache).then((cache) => {
      console.log("Attempting to cache files...");
      // Using map allows us to see which specific file fails
      return Promise.all(
        myfiles.map((url) => {
          return cache.add(url).catch((err) => {
            console.error(`Failed to cache: ${url}`, err);
          });
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});