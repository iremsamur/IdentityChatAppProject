import logo from './logo.svg';
import './App.css';
import Lobby from './components/Lobby';
import {HubConnectionBuilder,LogLevel} from '@microsoft/signalr';
import { useState } from 'react';

const App=()=>{
  const [connection,setConnection]=useState();

  const joinRoom= async(user,room)=>{
    try{
      const connection = new HubConnectionBuilder().withUrl("https://localhost:44324/chat")
      .configureLogging(LogLevel.Information)
      .build();//apiye .net core daki chat controller'a istek gider
      connection.on("ReceiveMessage",(user,message)=>{
        console.log("Message received",message);
      });
      await connection.start();
      await connection.invoke("JoinRoom",{user,room});
      setConnection(connection);



    }catch(e){
      console.log(e);

    }
  }
  return <div className='app'>
    <h2>My Chat</h2>
    <hr className='line'/>
    <Lobby joinRoom={joinRoom}></Lobby>

  </div>

}

export default App;
