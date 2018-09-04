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

	createMessage(message){
		const messages = this.state.newMessage
		this.messagesRef.push({
			content: message,
			roomId: this.props.activeRoom.key
		})
	}


	onSubmit(e) {
		e.preventDefault();
		if (!this.state.newMessage){
			return
		}
		this.createMessage(this.state.newMessage);
		this.setState({ newMessage: ''});
	}

	handleChange(e){
		this.setState({ newMessage: e.target.value})
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
					<li key={index}>{message.username} {message.content}</li>)
				
				)}
			</ul>
			<div id="create-message">
				<form onSubmit= {(e) => {this.createMessage(this.state.newMessage)}} >
				
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