"use client"
import { SessionUser } from '@/lib/jwt';
import { useSessionStore } from '@/store/session.store'
import { useEffect } from 'react';



export const SessionSync = ({user}: {user: SessionUser | null}) => {
    const setUser = useSessionStore((state) => state.setUser);

    useEffect(()=> {
        setUser(user);
    }, [user, setUser]);

    return null;

}
