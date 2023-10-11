import React, { useEffect, useState } from 'react';
import axios from "axios";

const ChatPage = () => {

  const [chats, setChats] = useState([]);

  const fetchChats = async () => {

    try {
      console.log("called")
      const {data} = await axios.get('http://localhost:4000/api/chat');
      setChats(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  useEffect(() => {
      fetchChats();
    },[]);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>

  )
}

export default ChatPage