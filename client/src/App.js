import './App.css';
import io from 'socket.io-client' ;
import {useState} from 'react';
import Chat from './Chat';

const socket=io.connect("https://chat-app-server-gzeo.onrender.com");


socket.on("connect", () => {
    console.log("connected to server");
});

socket.on("disconnect", () => {
    console.log("disconnected from server");
});

socket.on("connect_error", (err) => {
    console.error("Connection error:", err);
});




function App() {
  const [username,SetUser]=useState("");
  const [room,SetRoom]=useState("");
  const [showChat,setShowChat]=useState(false);

  const joinRoom=()=>{
      if(username!==""&&room!==""){
        socket.emit("join_room",room);
        setShowChat(true);
      }
  }
  return (
    <div className="App">
      {!showChat?(
      <div className="joinChatContainer">
      <h2>Join A chat</h2>
     <input type="text" placeholder="name..." onChange={(event)=>{SetUser(event.target.value)}}/>
     <input type="text" placeholder="roomid..."onChange={(event)=>{SetRoom(event.target.value)}}/>
     <button onClick={joinRoom}>Join A Room</button>

     
      </div>
      )
      :(
      <Chat socket={socket} username={username} room={room}/>
      )}
    </div>
      
  );
}

export default App;
