import { useEffect } from 'react';
import { requestForToken, onForegroundMessage } from '../config/firebase';
import { saveFcmToken } from '../services/notificationApi';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const FirebaseTokenManager = () => {
  const { user } = useAuth();
  const { success } = useToast();

  useEffect(() => {
    if (!user) return;

    const setupFCM = async () => {
      try {
        const token = await requestForToken();
        if (token) {
          console.log('[FCM] Token synced:', token);
          await saveFcmToken(token);
        }
      } catch (error) {
        console.error('[FCM] Setup error:', error);
      }
    };

    setupFCM();
  }, [user]);

  useEffect(() => {
    // foreground listener
    const unsubscribe = onForegroundMessage(async (payload) => {
      console.log('[FCM] Foreground Message Received:', payload);
      
      const title = payload.notification?.title || 'Toyovo India';
      const body = payload.notification?.body || '';

      // 1. Show UI Toast (Internal)
      success(`${title}: ${body}`);

      // 2. Trigger Native Browser Notification (External)
      if (!('Notification' in window)) return;

      if (Notification.permission === 'granted') {
        const notificationOptions = {
          body: body,
          icon: '/logo.png',
          badge: '/logo.png',
          tag: payload.data?.notificationId || Date.now().toString(),
          data: {
            ...payload.data,
            url: payload.data?.click_action || '/account'
          },
          vibrate: [200, 100, 200],
          requireInteraction: true
        };

        // Standard native notification
        try {
          const registration = await navigator.serviceWorker.ready;
          if (registration) {
            registration.showNotification(title, notificationOptions);
          } else {
            new Notification(title, notificationOptions);
          }
        } catch (err) {
          new Notification(title, notificationOptions);
        }
      }
    });

    return () => unsubscribe();
  }, [success]);

  return null;
};
