import React, { useEffect, useState } from 'react'

function Chat({socket,username,room}) {
    const [currentMessage,setCurrentMessage]=useState("");

    const send=async()=>{
        if(currentMessage!==""){
            const msgdata={
                room:room,
                author:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),


            }
           await socket.emit("send_msg",msgdata);
        }
    }

    useEffect(()=>{
        socket.on("recieve_msg",(data)=>{
            console.log(data);
        })
    },[socket]);

    
  return (
    <div className="chat-window" >
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body"></div>
        <div className="chat-footer">
            <input type="text" placeholder='Message here...' onChange={(event)=>{

            setCurrentMessage(event.target.value)}}/>
            <button onClick={send}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat