import { Brand } from "@/components/Brand";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-700 p-4 text-slate-300">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl text-white md:text-3xl">
            <Brand />
          </h1>
          <p className="mt-1 text-sm text-slate-400">Manage your student&apos;s application</p>
        </div>
        <div className="rounded-lg bg-gray-800 p-8 shadow-lg">{children}</div>
      </div>
    </div>
  );
}