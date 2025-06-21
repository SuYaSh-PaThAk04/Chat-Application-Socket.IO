import { useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from './Pages/Homepage';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import SettingsPage from './Pages/SettingsPage';
import Profile from './Pages/Profile';
import NavBar from './Components/NavBar';
import { AuthStore } from './Store/AuthStore';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './Store/ThemeStore';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = AuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to='/' />} />
        <Route path='/login' element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path='/settings' element={authUser ? <SettingsPage /> : <Navigate to="/" />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
