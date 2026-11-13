import React, { InputHTMLAttributes } from 'react'

type FieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string; name: string; }

export const Input = ({ label, name, ...props }: FieldProps) => {
    return (
        <label htmlFor={name} className='flex flex-col gap-1 text-sm'>
            <span className='opacity-80'>{label}</span>
            <input
                id={name}
                name={name}
                className="w-full rounded border border-gray-500 bg-slate-200 px-3 py-2 text-sm
text-slate-900 placeholder-slate-500 focus:border-blue-500 focus:ring-1
focus:ring-blue-500 focus:outline-none"
                {...props}
            />
        </label>

    )
}
