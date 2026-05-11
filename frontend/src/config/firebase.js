import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// Explicitly register service worker for robust FCM support
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      console.log('[FCM] Service Worker registered with scope:', registration.scope);
      return registration;
    } catch (err) {
      console.error('[FCM] Service Worker registration failed:', err);
    }
  }
  return null;
};

export const requestForToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Ensure SW is registered before getting token
      const registration = await registerServiceWorker();
      
      const currentToken = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });
      return currentToken;
    }
  } catch (error) {
    console.error('FCM Token Error:', error);
  }
  return null;
};

export const onForegroundMessage = (callback) => {
  return onMessage(messaging, (payload) => {
    callback(payload);
  });
};

export default app;
