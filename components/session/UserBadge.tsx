"use client"
import { useSessionStore } from '@/store/session.store'

export const UserBadge = () => {
    const user = useSessionStore((state) => state.user);

    if(!user) return <div className='h-12 aria-hidden'/>

  return (
    <div className='flex items-center gap-3'>
        <span className='grid h-9 w-9 place-items-center rounded-full bg-amber-100 font-bold text-gray-900'>
            {user.email[0].toUpperCase()}
        </span>
        <div className='min-w-0'>
            <p className='text-xs text-slate-500'>Bienvenido, </p>
            <p className='truncate text-sm font-semibold text-white'>{user.email}</p>
        </div>
    </div>
  )
}
