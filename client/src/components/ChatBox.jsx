import React, { useState, useEffect, useRef } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import Message from './Message'

const ChatBox = () => {
  
  const continerRef= useRef(null)

  const { selectedChat, theme } = useAppContext()

  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const[prompt,setPrompt]=useState('');
  const[mode,setMode]=useState('text');
  const[isPublished,setIsPublished]=useState(false);

  const onSubmit=async(e)=>{
    e.preventDefault();
  }

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages)
    }
  }, [selectedChat])

  useEffect(()=>{
     if(continerRef.current){
         continerRef.current.scrollTo({
           top: continerRef.current.scrollHeight,
           behavior: 'smooth'
         })
     }
  },[messages])

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-10 xl:mx-30 max-md:mt-14 2xl:pr-40">

      {/* Chat Messages */}
      <div  ref={continerRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">

        {(!messages || messages.length === 0) && (
          <div className="flex flex-col items-center gap-2 mt-20">
            <img
              src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
              alt="logo"
              className="w-full max-w-56 sm:max-w-68"
            />
            <p className="mt-5 text-4xl sm:text-6xl text-center text-gray-400 dark:text-white">
              Ask me anything.
            </p>
          </div>
        )}

        {messages.map((message, index) => (
          <Message message={message} key={index} />
        ))}

      {/* Loading Indicator */}
      { loading && <div className='loader flex items-center gap-1.5'>
          <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
          <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
          <div className='w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-white animate-bounce'></div>
          </div>
      }
      </div>

    {mode === 'image' && (
       <label className='inline-flex items-center gap-2 mb-3 text-sm mx-auto'>
          <p className='text-xs'>Publish Generated Image to Community</p>
          <input type='checkbox' className='cursor-pointer' checked={isPublished} 
          onChange={(e)=>setIsPublished(e.target.checked)}/>
       </label>
    )}

      {/* Prompt Input Box */}
      <form onSubmit={onSubmit} className='bf-primary/20 dark:bg-[#583C79]/30 border boder-primary 
      dark:border-[#80609F]/30 rounded-full w-full max-w-2xl p-3 pl4 mx-auto flex gap-4 items-center '>
         <select onChange={(e)=>setMode(e.target.value)} value={mode} className='text-sm pl-3 pr-2 outline-none'>
             <option value="text" className='dark:bg-purple-900'>Text</option>
             <option value="image"className='dark:bg-purple-900'>Image</option>
         </select>
         <input onChange={(e)=>setPrompt(e.target.value)} value={prompt} type='text' placeholder='Type your prompt here...'
          className='flex-1 w-full text-sm outline-none'/>
          <button disabled={loading}>
              <img src={loading? assets.stop_icon: assets.send_icon} className='w-8 cursor-pointer' alt=''/>
          </button>
      </form>
    </div>
  )
}

export default ChatBox
