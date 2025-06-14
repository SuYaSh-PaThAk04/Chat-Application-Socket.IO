import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom" 
import Homepage from './Pages/Homepage'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import SettingsPage from './Pages/SettingsPage'
import Profile from './Pages/Profile'
import NavBar from './Components/NavBar'
import { AuthStore } from './Store/AuthStore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './Store/ThemeStore'

function App() {
  const {authUser , checkAuth, isCheckingAuth}= AuthStore();
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
   const {theme } = useThemeStore()

  if(isCheckingAuth && !authUser){
<div className='flex item-center justify-cemter h-screen'>
<Loader className='size-10 animate-spin'/>
</div>
  }
  return (
    <>
    <NavBar />
       <Routes>
        <Route path='/' element={authUser ? <Homepage/> : <Navigate to="/login"/>}/>
         <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login />}/>
           <Route path='/settings' element={ !authUser ?<SettingsPage /> : <Navigate to="/" />}/>
            <Route path='/profile' element={<Profile/>}/>
       </Routes>
       <Toaster/>
    </>
  )
}

export default App
