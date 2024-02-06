importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.7.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyC5GGjkWnEAR-eEeKJGMRurz51S-nlpWZg",
  authDomain: "irestaurant-11.firebaseapp.com",
  projectId: "irestaurant-11",
  storageBucket: "irestaurant-11.appspot.com",
  messagingSenderId: "79775623261",
  appId: "1:79775623261:web:160c493dbdd288ca9405b4",
  measurementId: "G-MBCDSC33WV",
});

const messaging = firebase.messaging();
