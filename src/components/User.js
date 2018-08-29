import React, { Component } from 'react';
import * as firebase from 'firebase';

class User extends Component { 
	constructor(props) {
		super(props);

	}

signIn(){
	const provider = new this.props.firebase.auth.GoogleAuthProvider();
	this.props.firebase.auth().signInWithPopup( provider );
}


  signOut(){
    this.props.firebase.auth().signOut();

  }

  handleSignOut(user){
  	this.signOut();
  	this.props.setUser(user);
  }

  

  componentDidMount(){
  	this.props.firebase.auth().onAuthStateChanged( user => {
  this.props.setUser(user);
})
  }

render(){
	console.log(this.props.activeUser)
	return(
		<div>
		<button onClick={() => this.signIn()}>Sign in</button>
		<button onClick={() => this.handleSignOut()}>Sign out</button>
		<span>{this.props.activeUser.displayName}</span>
		</div>
		)
}

}

export default User; 