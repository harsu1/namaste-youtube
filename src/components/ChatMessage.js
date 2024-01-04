 
import React from 'react'
import user from "./user icon.png";
const chatMessage = ({name,message}) => {
  return (
    <div className='flex items-center shadow-sm p-2'>
      <img className="h-8" alt="user" src={user} />
      <span className='font-bold px-2'>{name}</span>
      <span>{message}</span>
    </div>
  )
}

export default chatMessage
