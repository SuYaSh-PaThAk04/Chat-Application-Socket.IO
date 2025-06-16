import React, { useEffect } from 'react'
import { chatStore } from '../Store/chatStore'
import SideSkelton from './SideSkelton';

function Sidebar() {

    const {getUsers, users,isMessagesLoading,getMessages,isUsersLoading,selectedUser,setSelectedUser} = chatStore()

    const onlineUser = [];
    useEffect(()=>{
        getUsers();
    },[getUsers])
    if(isUsersLoading) return <SideSkelton />
  return (
    <aside>
        
    </aside>
  )
}

export default Sidebar