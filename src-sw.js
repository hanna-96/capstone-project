workbox.precaching.precacheAndRoute(self.__precacheManifest);

//cache the results from our cocktailDB API calls
workbox.routing.registerRoute(
  /https:\/\/www\.thecocktaildb\.com\/api\/json\/v1\/1/,
  new workbox.strategies.NetworkFirst({
    cacheName: "theCocktailDB",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 10 * 60 // 10 minutes
      })
    ]
  })
);