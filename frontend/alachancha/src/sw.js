/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching'

// ⚡️ Esto lo inserta vite-plugin-pwa automáticamente al build
precacheAndRoute(self.__WB_MANIFEST)

// ✅ Manejo de push notifications
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();

  const title = data.title || 'Nueva notificación';
  const options = {
    body: data.body || '',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    data: data.url || '/',
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = event.notification.data;
  event.waitUntil(clients.openWindow(url));
});
