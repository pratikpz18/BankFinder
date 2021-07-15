import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyClMX69SyzkNIIr5aOAJW9dJekDcQJvRog",
    authDomain: "task2-34be9.firebaseapp.com",
    projectId: "task2-34be9",
    databaseURL: "https://task2-34be9.firebaseio.com",
    storageBucket: "task2-34be9.appspot.com",
    messagingSenderId: "203884073822",
    appId: "1:203884073822:web:fd0981cd2f7bd5bfdfb5cf",
    measurementId: "G-E10JYWHETE"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;