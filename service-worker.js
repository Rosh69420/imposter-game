const CACHE_NAME = "imposter-game-v2";

const FILES_TO_CACHE = [
  "./index.html",
  "./manifest.json",
  "./icon.png"
];

// Install
self.addEventListener("install", (event) => {
  self.skipWaiting(); // IMPORTANT

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

// Activate (VERY IMPORTANT FIX)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    ).then(() => self.clients.claim())
  );
});

// Fetch (safe version)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
