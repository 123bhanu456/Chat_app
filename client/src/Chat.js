import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
function Chat({socket,username,room}) {
    const [currentMessage,setCurrentMessage]=useState("");
    const [messageList,setMessageList]=useState([]);

    const send=async()=>{
        if(currentMessage!==""){
            const msgdata={
                room:room,
                author:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),


            }
           await socket.emit("send_msg",msgdata);
           setMessageList((list)=>[...list,msgdata]);
           setCurrentMessage("");
        }
    }

    useEffect(() => {
        const handleReceivedMessage = (data) => {
            setMessageList((list) => [...list, data]);
        };
        socket.on("recieve_msg", handleReceivedMessage);

        return () => {
            socket.off("recieve_msg", handleReceivedMessage);
        };
    }, [socket]);
    

    
  return (
    <div  className="chat-window">
        <div className="chat-header">
            <p>Live Chat</p>
        </div>
        <div className="chat-body">
            <ScrollToBottom className='message-container'>
            {messageList.map((content)=>{
               return (
               <div className='message' id={username===content.author?"you":"other"}>
                <div className='message-content'>
                    <p>{content.message}</p>
                </div>
                <div className='message-meta'>
                <p id="time">{content.time} </p>
                <p id="author">{content.author}</p>
                </div>
               </div>
               )
            })}
            </ScrollToBottom>
        </div>
        <div className="chat-footer">
            <input type="text" value={currentMessage} placeholder='Message here...' onChange={(event)=>{

            setCurrentMessage(event.target.value)}}
            onKeyUp={(event)=>{event.key==="Enter"&&send();}}/>
            <button onClick={send}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat