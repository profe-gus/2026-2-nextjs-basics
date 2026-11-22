"use client"
import React, { useActionState } from 'react'
import { Input } from '../form-ui/Input';
import { AuthFormState, registerAction } from '@/app/(auth)/actions';
import { SubmitButton } from '../form-ui/SubmitButton';

const initialState : AuthFormState = {}

export const RegisterForm = () => {
    const [state, formAction, pending] = useActionState(registerAction, initialState);
  return (
    <form action={formAction} className='flex flex-col gap-4'>
        <Input
        label='Nombre completo'
        name='fullName'
        required
        />
        <Input
        label='Correo electronico'
        name='email'
        required
        />
        <Input
        label='Contrasena'
        name='password'
        required
        maxLength={16}
        minLength={8}
        type='password'
        />
        { state.error && (
            <p role='alert' className='text-sm text-red-500'>
                {state.error}
            </p>
        )}

        <SubmitButton pending={pending} pendingText='Creando usuario...'>
            Crear usuario
        </SubmitButton>
    </form>
  )
}
