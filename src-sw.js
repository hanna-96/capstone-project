workbox.precaching.precacheAndRoute(self.__precacheManifest);
//^^^^ this is from smashing magazine tutorial

// workbox.routing.registerRoute(
//   /https:\/\/api\.exchangeratesapi\.io\/latest/,
//   new workbox.strategies.NetworkFirst({
//     cacheName: "currencies",
//     plugins: [
//       new workbox.expiration.Plugin({
//         maxAgeSeconds: 10 * 60 // 10 minutes
//       })
//     ]
//   })
// );
