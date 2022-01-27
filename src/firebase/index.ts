import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyB-oH7um2kpuKS9MYAoF1j5g7-0jBWqTPw',
    authDomain: 'chat-test-project-228dd.firebaseapp.com',
    projectId: 'chat-test-project-228dd',
    storageBucket: 'chat-test-project-228dd.appspot.com',
    messagingSenderId: '748735832284',
    appId: '1:748735832284:web:eaa254d0092f27a6bc5419',
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const firestore = firebase.firestore();
const storage = firebase.storage();

export { app, auth, firebase, firestore, storage };
