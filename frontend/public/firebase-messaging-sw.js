importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// These values are hardcoded in SW because it can't access import.meta.env easily
// For production, you might want to inject these during build
firebase.initializeApp({
  apiKey: "AIzaSyD5vHgsmPBJ9-elOMgzEcRvhEd2ctiXMWk",
  authDomain: "toyovoindia-95fde.firebaseapp.com",
  projectId: "toyovoindia-95fde",
  storageBucket: "toyovoindia-95fde.firebasestorage.app",
  messagingSenderId: "614606970846",
  appId: "1:614606970846:web:0816f8864e7a0063d2874f"
});

const messaging = firebase.messaging();

// Shown notifications set to prevent duplicates in the background
const shownNotifications = new Set();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationId = payload.data?.notificationId;
  if (notificationId && shownNotifications.has(notificationId)) {
    console.log('[firebase-messaging-sw.js] Duplicate notification blocked');
    return;
  }

  if (notificationId) {
    shownNotifications.add(notificationId);
    // Cleanup set after some time
    setTimeout(() => shownNotifications.delete(notificationId), 60000);
  }

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png', // Update with your actual logo path
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const clickAction = event.notification.data?.click_action || '/account';
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Check if there's already a window open with this URL
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        // If the URL matches or it's a relative path that matches, focus it
        if (client.url.includes(clickAction) && 'focus' in client) {
          return client.focus();
        }
      }
      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(clickAction);
      }
    })
  );
});
