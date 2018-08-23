import React, { Component } from 'react';





class RoomList extends Component {
	constructor(props) {
			super(props);
			
			this.roomsRef = this.props.firebase.database().ref('rooms');
			this.state = {
			rooms : [],
			activeRoom: '',
	}

		};
	

	componentDidMount() {
		this.roomsRef.on('child_added', snapshot => {
			const room = snapshot.val();
			room.key = snapshot.key;
			this.setState({ rooms: this.state.rooms.concat( room ) });
		});
		
	}




	createRoom(name){
		const rooms = this.state.newRoomName
		this.roomsRef.push({
  			name: name
			});
	}

	onSubmit(e) {
		e.preventDefault();
		if (!this.state.newRoomName){
			return
		}
		this.createRoom(this.state.newRoomName);
		this.setState({ newRoomName: ''});
	}

	handleChange(e){
		this.setState({ newRoomName: e.target.value})
	}





	render() {
		return (
			<section className ="chat-room-list">
			{this.state.rooms.map( (room, index) =>
				
					<li className="room-list" key={index} onClick={() => this.props.handleRoomClick(room)}>{room.name}</li>
				
				)}
			<div id="create-room">
				<form onSubmit= {(e) => this.onSubmit(e)} >
				<label>Room Name
				<input type="text" 
				value={this.state.newRoomName}
				onChange={ (e) => this.handleChange(e) }
				/>
				</label> 
				<input type="submit"
				value="create" />
				</form>
			</div>
			</section>
			);
	}
}


	export default RoomList;