workbox.setConfig({ debug: false })

workbox.precaching.precacheAndRoute(self.__precacheManifest);

//for testing cache
workbox.routing.registerRoute(
  /http:\/\/localhost:8080\//,
  new workbox.strategies.NetworkFirst({
    cacheName: "testCache",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 10 * 60 // 10 minutes
      })
    ]
  })
)

//Liz's deployed heroku address
workbox.routing.registerRoute(
  /https:\/\/mixologist-cap\.herokuapp\.com\//,
  new workbox.strategies.NetworkFirst({
    cacheName: "mixology",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 259200 //3 days
      })
    ]
  })
)