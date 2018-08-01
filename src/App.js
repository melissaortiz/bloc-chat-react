import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList'

var config = {
    apiKey: "AIzaSyDO9f6R7JfPvdLHhVlA9B9B174390nryTI",
    authDomain: "bloc-chat-react-88e9d.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-88e9d.firebaseio.com",
    projectId: "bloc-chat-react-88e9d",
    storageBucket: "bloc-chat-react-88e9d.appspot.com",
    messagingSenderId: "292179037323"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="app">
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
