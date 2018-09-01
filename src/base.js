import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyC4cLoxKTIDke6ijAbI2ce_BC9VTjcYbH0",
        authDomain: "catch-of-the-day-sdivelbiss.firebaseapp.com",
        databaseURL: "https://catch-of-the-day-sdivelbiss.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export
export { firebaseApp };

//Default export

export default base;