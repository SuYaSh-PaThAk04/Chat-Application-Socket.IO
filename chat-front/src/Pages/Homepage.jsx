import React from 'react'
import NavBar from '../Components/NavBar'
import Sidebar from '../Components/Sidebar'
import ChatContainer from '../Components/ChatContainer'
import NoChatSelected from '../Components/NoChatSelected'
import { chatStore } from '../Store/chatStore'

function Homepage() {

  const {selectedUser} = chatStore();
  return (
    <>
    <NavBar/>
      <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Homepage