import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA0nebsUBzKPpD-3xbHiaKBTEMRu11xCPo',
  authDomain: 'myeapp-af178.firebaseapp.com',
  projectId: 'myeapp-af178',
  storageBucket: 'myeapp-af178.appspot.com',
  messagingSenderId: '143058487084',
  appId: '1:143058487084:web:51e9cef55182d689098e89',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
