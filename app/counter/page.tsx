"use client"
import React, { useState } from 'react'

export default function CounterPage() {

    const [count, setCount] = useState<number>(0)

    const buttonClasses = `m-2 flex w-[120] items-center justify-center
    rounded-xl bg-gray-700 p-2 text-white`

  return (
    <div className='flex flex-col items-center'>
    <span className='text-8xl font-bold'>{count}</span>
    <div className='flex'>
      <button 
        className={buttonClasses}
        onClick={()=> setCount(count + 1)}>+</button>
      <button 
        className={buttonClasses}
        onClick={()=> setCount(count - 1)}>-</button>
    </div>
    </div>
  )
}
