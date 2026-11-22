"use client"
import { logoutAction } from '@/app/(auth)/actions'
import { useSessionStore } from '@/store/session.store'



export const LogOutButton = ({className}: {className? : string}) => {
    const setUser = useSessionStore((state) => state.setUser);
  return (
    <form action={logoutAction}  onSubmit={() => setUser(null)}>
        <button className={className}>Cerrar sesion</button>
    </form>
  )
}
