"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react'

const DEBOUNCE_MS = 300;

export const StudentSearch = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const urlTerm = searchParams.get("q") ?? "";

    const inputRef = useRef<HTMLInputElement>(null);
    const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

    function handleChange(term: string){
        clearTimeout(timer.current);
        timer.current = setTimeout(()=> {
            const params = new URLSearchParams(searchParams);
            if(term.trim()) params.set("q", term);
            else params.delete("q");
            params.delete("page");
            const query = params.toString();
            router.replace(query ? `${pathname}?${query}` : pathname, {  scroll : false })
        }, DEBOUNCE_MS)
        
    }

    useEffect(() => {
        const input = inputRef.current;
        if(input && input !== document.activeElement) input.value = urlTerm;
    }, [urlTerm]);

    useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <input 
        type="text"
        ref={inputRef}
        defaultValue={urlTerm}
        onChange={(event)=> handleChange(event.target.value)}
        placeholder='Busca por nombre, nickname o id'
        aria-label='Search students'
        className='w-full rounded-lg border border-slate-300 bg-slate-400 p-2'
    />
  )
}
