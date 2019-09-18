import React, { Component } from 'react';
//import * as firebase from 'firebase';

class User extends Component { 
	

signIn(){
	const provider = new this.props.firebase.auth.GoogleAuthProvider();
	this.props.firebase.auth().signInWithPopup( provider );
}


  signOut(){
    this.props.firebase.auth().signOut();

  }

  handleSignOut(user){
  	this.signOut();
  	
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
		<h3>{(this.props.activeUser) ? this.props.activeUser.displayName : 'Guest'}</h3>
				</div>
		)
}

}

export default User; 