  import *  as firebase from 'firebase'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB-UL_Wv9Dd5XU4jnsPlj7CvYSLx_dWRWU",
    authDomain: "graphql-alexn.firebaseapp.com",
    //databaseURL: "https://graphql-alexn.firebaseio.com",
    projectId: "graphql-alexn",
    storageBucket: "graphql-alexn.appspot.com",
    // messagingSenderId: "851870765774",
    appId: "1:851870765774:web:cbe55db96bc2b1d3f4769f",
    measurementId: "G-SDY78RQT5Y"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 // firebase.analytics();

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();