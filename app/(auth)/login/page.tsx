import { LoginForm } from '@/components/auth/LoginForm';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = { title: "Log in" };

async function LoginFormWithRedirect({ searchParams }: Pick<PageProps<"/login">, "searchParams">) {
    const { from } = await searchParams;
    return <LoginForm from={typeof from === "string" ? from : undefined} />;
}
export default function LoginPage({ searchParams }: PageProps<"/login">) {
    return (
        <Suspense fallback={<div className="h-64 animate-pulse rounded bg-gray-700" />}>
            <LoginFormWithRedirect searchParams={searchParams} />
        </Suspense>
    );
}
