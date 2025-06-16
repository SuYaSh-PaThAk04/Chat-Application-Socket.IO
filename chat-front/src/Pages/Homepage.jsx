import React from 'react'
import NavBar from '../Components/NavBar'
import Sidebar from '../Components/Sidebar'
import ChatContainer from '../Components/ChatContainer'
import NoChatSelected from '../Components/NoChatSelected'
import { chatStore } from '../Store/chatStore'

function Homepage() {

  const {selectUser} = chatStore();
  return (
    <div>Homepage</div>
  )
}

export default Homepage