import React from 'react'

type SubmitButtonProps = { pending: boolean; children: React.ReactNode; pendingText: string };
export function SubmitButton({ pending, children, pendingText }: SubmitButtonProps) {
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full rounded bg-blue-500 px-4 py-2 text-sm font-semibold text-white
transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-800"
        >
            {pending ? pendingText : children}
        </button>
    );
}
