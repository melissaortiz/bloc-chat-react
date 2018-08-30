import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User.js';

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
  constructor(props){
    super(props);
      this.state = { 
        activeRoom: {}, 
        activeUser: ''
    };
  }

  handleRoomClick(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user){
    this.setState({ activeUser: user});
  }



  render() {
    return (
      <div className="app">
        <header className="chatHeader">
        Bloc Chat
        </header>
        <User firebase={firebase} activeUser={this.state.activeUser} setUser={this.setUser.bind(this)} />
        <RoomList firebase={firebase} activeRoom={this.state.activeRoom} handleRoomClick={this.handleRoomClick.bind(this)} />
        <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
      </div>
    );
  }
}

export default App;
