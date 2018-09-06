import React, { Component } from 'react';
import * as firebase from 'firebase';


class MessageList extends Component{
	constructor(props) {
		super(props);
		this.state = {
			messages : [],
			newMessage: ""
		}
		this.messagesRef = this.props.firebase.database().ref('messages');
	}

	createMessage(e, message){
		e.preventDefault();
		if (!this.state.newMessage){
			return
		}
		const messages = this.state.newMessage
		this.messagesRef.push({
			content: message,
			username: this.props.activeUser ? this.props.activeUser.displayName : " Guest",
			sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
			roomId: this.props.activeRoom.key
		})
	}

	handleChange(e){
		this.setState({ newMessage: e.target.value})
	}

	formatTime(time) {
  console.log(time);
  var date = new Date(time);
  var minutes = date.getMinutes();
  if(minutes < 10) {
    minutes = '0' + minutes;
  }
  if( this.hours >12 )
  { this.hours = this.hours - 12; }
  return (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + (date.getHours() % 12)+ ":" + minutes;
}


	componentDidMount() {
		this.messagesRef.on('child_added', snapshot => {
			const message = snapshot.val();
			message.key = snapshot.key;
			this.setState({ messages: this.state.messages.concat( message ) })
			
		});

	}



	render() {
			
							

		return(
			<section className="message-list">
			<h2>{this.props.activeRoom.name}</h2>
			<ul className="messages">
			{this.state.messages.filter( (message) => message.roomId === this.props.activeRoom.key).map((message, index) =>(
					<li key={index}><b>{message.username}</b> {this.formatTime(message.sentAt)} {message.content}</li>)
				
				)}
			</ul>
			<div id="create-message">
				<form onSubmit= {(e) => {this.createMessage(e, this.state.newMessage)}} >
				
				<input type="text" 
				placeholder="Your message"
				value={this.state.newMessage}
				onChange={ (e) => this.handleChange(e) }
				/>
				
				<input type="submit"
				value="send" />
				</form>
			</div>
			</section>

			)
	}
}

export default MessageList;