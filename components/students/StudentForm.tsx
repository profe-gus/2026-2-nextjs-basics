"use client"
import { createStudentAction, StudentFormState } from '@/app/(dashboard)/students/new/actions'
import React, { useActionState } from 'react'
import { Input } from '../form-ui/Input';
import { SubmitButton } from '../form-ui/SubmitButton';

const initialState : StudentFormState = {};


export const StudentForm = () => {
    const [state, formAction, pending] = useActionState(createStudentAction, initialState);

  return (
    <form action={formAction} className='grid max-w-md gap-4'>
        <Input
        label='Nombre'
        name='name'
        required
        />
        <Input
        label='Edad'
        name='age'
        type='number'
        min={1}
        required
        />
        <Input
        label='email'
        name='email'
        type='email'
        required
        />
        <label htmlFor='gender' className='flex flex-col gap-1 text-sm'>
            <span className='opacity-80'>Como te identificas?</span>
            <select name="gender" id="gender" className='rounded border border-gray-500 bg-slate-200 px-3 py-2 text-sm'>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </label>
        <Input
        label='Materias favoritas (Separadas por comas)'
        name='favoriteSubjects'
        />
        <label className='flex items-center gap-2 text-sm'>
            <input type="checkbox" name='isActive' defaultChecked /> Activo
        </label>
        { state.error && (
            <p role='alert' className='text-sm text-red-500'>
                {state.error}
            </p>
        )}
        <SubmitButton pending={pending} pendingText='Creando estudiante...'>
            Crear Estudiante
        </SubmitButton>
    </form>
  )
}
