// src/utils/notifications.ts
const API_NOTIF = 'https://api.alacancha.online/api/notification';

// Convierte una clave pública VAPID Base64 a Uint8Array
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Inicializa el registro y suscripción al servicio de notificaciones Push
 * @param usuarioId - ID del usuario logueado
 */
export async function initPushNotifications(usuarioId: number) {
  // 1️⃣ Solicitar permiso al usuario
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Permiso de notificaciones denegado');
  }

  // 2️⃣ Registrar el Service Worker (vite-plugin-pwa lo genera en dist/sw.js)
  const registration = await navigator.serviceWorker.register('/sw.js');
  await navigator.serviceWorker.ready;

  // 3️⃣ Obtener la clave pública VAPID desde tu backend
  const vapidResponse = await fetch(`${API_NOTIF}/vapid-public-key`);
  if (!vapidResponse.ok) throw new Error('No se pudo obtener la clave pública');
  const { publicKey } = await vapidResponse.json();

  // 4️⃣ Crear la suscripción push en el navegador
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });

  // 5️⃣ Enviar suscripción al backend
  const response = await fetch(`${API_NOTIF}/suscribir`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usuarioId,
      suscripcion: subscription.toJSON(),
    }),
  });

  if (!response.ok) {
    throw new Error('Error al guardar la suscripción en el servidor');
  }

  console.log('✅ Notificaciones activadas para el usuario:', usuarioId);
}
