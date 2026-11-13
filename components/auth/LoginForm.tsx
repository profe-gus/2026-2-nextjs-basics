 "use client";
import { AuthFormState, loginAction } from '@/app/(auth)/actions';
import Link from 'next/link';
import React, { useActionState } from 'react'
import { SubmitButton } from '../form-ui/SubmitButton';
import { Input } from '../form-ui/Input';

const initialState: AuthFormState = {};

export function LoginForm({ from }: { from?: string }) {
    const [state, formAction, pending] = useActionState(loginAction, initialState);
    return (
        <form action={formAction} className="flex flex-col gap-4">
            <h1 className="mb-2 text-lg font-semibold">Log in</h1>
            <input type="hidden" name="from" value={from ?? "/students"} />
            <Input label="Correo electronico" name="email" type="email" defaultValue={state.email} required />
            <Input label="Contrasena" name="password" type="password" required minLength={8} />
            {state.error && (
                <p role="alert" className="text-sm text-red-400">
                    {state.error}
                </p>
            )}
            <SubmitButton pending={pending} pendingText="Ingresando...">
                Ingresar
            </SubmitButton>
            <Link href="/register" className="text-center text-sm text-slate-400 underline
hover:text-white">
                Registrate
            </Link>
        </form>
    );
}
