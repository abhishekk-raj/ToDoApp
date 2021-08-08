import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDtBKvlWGXKofY_0QyL4BiBKeJe8mPfecw',
  authDomain: 'nitishmusicals.firebaseapp.com',
  databaseURL: 'https://nitishmusicals.firebaseio.com',
  projectId: 'nitishmusicals',
  storageBucket: 'nitishmusicals.appspot.com',
  messagingSenderId: '980131320417',
  appId: '1:980131320417:web:6aafeaaa4a424726b99020',
  measurementId: 'G-2PWD18872T',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
