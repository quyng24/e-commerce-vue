// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD0RN4eIOyGkx2cZy5Bo2JClCIfKOxaIVg',
  authDomain: 'shop-online-fc7aa.firebaseapp.com',
  projectId: 'shop-online-fc7aa',
  storageBucket: 'shop-online-fc7aa.firebasestorage.app',
  messagingSenderId: '337535811300',
  appId: '1:337535811300:web:56c04aac01d4b6f48f36f1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
export { app as firebase, db, auth }
