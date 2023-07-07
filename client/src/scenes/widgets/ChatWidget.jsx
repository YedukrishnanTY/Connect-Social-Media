import React, { useState, useEffect } from 'react';
import { Typography, useTheme, TextField, Button } from "@mui/material";

import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

import { useSelector } from "react-redux";
import io from 'socket.io-client';
import UserImage from "components/UserImage";
import { Box, useMediaQuery } from "@mui/material";



const ChatWidget = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const main = palette.neutral.main;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);

  // const [activeSockets, setActiveSockets] = useState([]);
  // useEffect(() => {
  //   if (socket) {
  //     socket.emit("getActiveMembers");
  
  //     socket.on("activeMembers", (members) => {
  //       setActiveSockets(members);
  //     });
  //   }
  // }, [socket]);
  


  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  

  useEffect(() => {
    if (selectedCategory) {
      // create socket connection
      const newSocket = io("http://localhost:3002");
      setSocket(newSocket);
  
      // join the chat room based on the selected category
      newSocket.emit('joinCategory', selectedCategory);
  
      // listen for incoming messages
      newSocket.on('message', message => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
      
      // cleanup on unmount
      return () => {
        newSocket.emit('leaveCategory', selectedCategory); // leave the chat room
        newSocket.disconnect();
      };
    }
  }, [selectedCategory]);
  

  const handleSend = () => {
    if (newMessage.trim() !== '' && selectedCategory) {
      // emit new message to server with user ID and selected category
      socket.emit('sendMessage', { message: newMessage, userId: userId , picturePath : user.picturePath, firstName: user.firstName, category: selectedCategory });
      console.log(newMessage,userId,user.picturePath,user.firstName,selectedCategory)
      setNewMessage('');
    }
  }

  if (!user) {
    return null;
  }
  return (
    <WidgetWrapper>
      
  
      <Box sx={{ display: 'flex', flexDirection: isNonMobileScreens ? 'row' : 'column', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
      <Typography variant="body1" sx={{ color: main, fontWeight: 600 }}>Categories:</Typography>

      {isNonMobileScreens ?
        <>
          <Button variant={selectedCategory === 'general' ? 'contained' : 'outlined'} onClick={() => setSelectedCategory('general')}>General</Button>
          <Button variant={selectedCategory === 'technology' ? 'contained' : 'outlined'} onClick={() => setSelectedCategory('technology')}>Technology</Button>
          <Button variant={selectedCategory === 'science' ? 'contained' : 'outlined'} onClick={() => setSelectedCategory('science')}>Science</Button>
          <Button variant={selectedCategory === 'music' ? 'contained' : 'outlined'} onClick={() => setSelectedCategory('music')}>Music</Button>
        </>
        :
        <>
          <Box sx={{ flexDirection: 'row', gap: '5px' }}>
            <Button variant={selectedCategory === 'general' ? 'contained' : 'outlined'} onClick={ () => setSelectedCategory('general')}>General</Button>
            <Button variant={selectedCategory === 'technology' ? 'contained' : 'outlined'} onClick={() => setSelectedCategory('technology')}>Technology</Button>
            <Button variant={selectedCategory === 'science' ? 'contained' : 'outlined'} onClick={() => setSelectedCategory('science')}>Science</Button>
            <Button variant={selectedCategory === 'music' ? 'contained' : 'outlined'} onClick={() => setSelectedCategory('music')}>Music</Button>
          </Box>
        </>
      }
    </Box>
    
  
     <div style={{ height: '75vh', overflowY: 'scroll' }}>
  {messages.map((message, index) => {
    // check if the message belongs to the selected category
    if (message.category === selectedCategory) {
      return (
        <div key={index} style={{ display: 'flex', justifyContent: message.userId === userId ? 'flex-end' : 'flex-start', marginBottom: '8px' }}>
          {message.userId !== userId && <UserImage image={message.picturePath}  />}

          <Typography variant="body1" sx={{  backgroundColor: message.userId === userId ? '#C8E6C9' : '#B3E5FC', borderRadius: '8px', padding: '8px 12px', color: 'black' }}>
  {message.userId !== userId && `${message.firstName}:`} {message.message}
  <div style={{ fontSize: 'small', marginTop: '4px' }}>{message.time}</div>
</Typography>

        </div>
      );
    } else {
      return null; // message does not belong to selected category, so don't render it
    }
  })}
</div>

      <FlexBetween>
      <TextField 
        fullWidth 
        variant="outlined" 
        placeholder="Type your message..." 
        value={newMessage} 
        onChange={event => setNewMessage(event.target.value)} 
        onKeyDown={event => {
          if (event.keyCode === 13) { // 13 is the keyCode for the Enter key
            handleSend();
          }
        }}
      />

      </FlexBetween>
  
      {socket === null && <Typography variant="body1" sx={{ color: main, marginTop: '10px' }}>Please select a category to start chatting.</Typography>}
    </WidgetWrapper>
  );
        }  
export default ChatWidget;
