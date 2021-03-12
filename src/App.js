import React, { useState, useEffect } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import Button from './components/Button';

firebase.initializeApp({
    apiKey: "AIzaSyC5YeH27IqMlDJrMBoKIyiUtW4mdK6axsU",
    authDomain: "react-chat-app-gabe.firebaseapp.com",
    projectId: "react-chat-app-gabe",
    storageBucket: "react-chat-app-gabe.appspot.com",
    messagingSenderId: "73216928138",
    appId: "1:73216928138:web:c2c5cbd8a635c866b14073",
    measurementId: "G-RP1QDE7FRK"
});

const auth = firebase.auth();

function App() {
  const [ user, setUser ] = useState(() => auth.currentUser);
  const [ initializing, setInitializing ] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setUser(user);
      } else {
        setUser(false);
      }
      if (initializing) {
        setInitializing(false);
      }
    })
    return unsubscribe
  });

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (initializing) return "Loading ... ";

  return (
    <div>
      {user ? (
        <>
        <Button onClick={signOut}>Sign Out</Button>
        <p>"Welcome to the Chatroom"</p>
        </>
        ) : (
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        )}
    </div>
  );
}

export default App;
