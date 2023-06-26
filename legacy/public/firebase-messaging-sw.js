importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.6/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyD9myJlHRJfcFdoQnHt7DBxEz6Ez_nl9j8",
  authDomain: "newsraven-kashif.firebaseapp.com",
  databaseURL: "https://newsraven-kashif.firebaseio.com",
  projectId: "newsraven-kashif",
  storageBucket: "newsraven-kashif.appspot.com",
  messagingSenderId: "915328458077",
  appId: "1:915328458077:web:bb0b17fa6baa1f084f5cb4"
});

if (firebase.messaging.isSupported()) {
  var messaging = firebase.messaging();

  messaging.onBackgroundMessage((payload) => {
    // console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // // Customize notification here
    // const notificationTitle = "Hello Raven";//payload.data.title;
    // const notificationOptions = {
    //   body: payload.data.body,
    //   icon: payload.data.icon,
    //   data: {url: payload.data.click_action }, // the url which we gonna use later
    //   actions: [{action: "open_url", title: "Read Now"}]
    // };

    // self.registration.showNotification(notificationTitle,
    //   notificationOptions);
  });


  self.addEventListener('notificationclick', (event) => {
    let url = event.data.click_action;
    window.alert(url);
    event.notification.close();
    event.waitUntil(
      clients.matchAll({type: 'window'}).then( windowClients => {
          // Check if there is already a window/tab open with the target URL
          for (var i = 0; i < windowClients.length; i++) {
              var client = windowClients[i];
              // If so, just focus it.
              if (client.url === url && 'focus' in client) {
                  return client.focus();
              }
          }
          // If not, then open the target URL in a new window/tab.
          if (clients.openWindow) {
              return clients.openWindow(url);
          }
      })
    );

    // self.clients.openWindow(event);
    // console.log('[firebase-messaging-sw.js] notificationclick event ', event);
    // if (event.data.click_action !== undefined) {
    //   // self.clients.openWindow(event.data.click_action);
    //   self.clients.openWindow(
    //     "https://www.worldometers.info/coronavirus"
    //   );
    // }
  });
}