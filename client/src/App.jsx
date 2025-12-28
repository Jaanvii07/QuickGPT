import React from 'react'
import Sidebar from './components/Sidebar'
import { Routes ,Route, useLocation } from 'react-router-dom'
import ChatBox from './components/ChatBox'
import Credits from './pages/Credits'
import Community from './pages/Community'
import { useAppContext } from './context/AppContext'
import { assets } from './assets/assets'
import './assets/prism.css'
import Loading from './pages/Loading'
import Login from './pages/login'
import {Toaster} from 'react-hot-toast'

function App() {

   const{user , loadingUser}=useAppContext();

  const { theme } = useAppContext()

   const[isMenuOpen,setIsMenuOpen]=React.useState(false);
   const { pathname } = useLocation()
   if(pathname==='/loading' || loadingUser) return <Loading/>

  return (
    <>
    <Toaster/>
     {!isMenuOpen && <img src={assets.menu_icon} onClick={()=>setIsMenuOpen(true)}
     className='absolute top-3 left-3 w-8 h-8 cursor-pointer md:hidden not-dark:invert'/>}
      <div
        className={
          theme === "dark"
            ? "bg-gradient-to-b from-[#242124] to-[#000000] text-white"
            : "bg-white text-black"
        }
      >
        {user ? (
          <div className='flex h-screen w-screen'>
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
        <Routes>
          <Route path='/' element={<ChatBox/>}/>
          <Route path='/credits' element={<Credits/>}/>
          <Route path='/community' element={<Community/>}/>
        </Routes>
      </div>
  
        ):(
          <div className='bg-gradient-to-b from-[#242124] to-[#000000] flex items-center justify-center h-screen w-screen'>
            <Login/>
          </div>
        )}
      
     </div>
    </>
  )
}

export default App
