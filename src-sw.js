workbox.setConfig({ debug: false })

workbox.precaching.precacheAndRoute(self.__precacheManifest);

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