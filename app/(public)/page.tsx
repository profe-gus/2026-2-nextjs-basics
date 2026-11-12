import { Brand } from "@/components/Brand";
import { Section } from "@/components/Section";
import Link from "next/link";

export default function Home() {

  return (

    <div className="space-y-12">
      <section className="mx-auto max-w-2xl space-y-4 py-16 text-center">
        <h1 className="text-4xl">
          <Brand />
        </h1>
        <p className="text-slate-500">
          Administra tus estudiantes: Frontend construido con Next.js para nuestras API  hechas en NestJS + Postgres.
        </p>
        <Link
          href="/students"
          className="inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
        >
          Ir a estudiantes
        </Link>
      </section>

      <Section title="Que vamos a construir?" id={"summary"}>
        <ul className="list-disc space-y-1 pl-6 text-slate-600">
          <li>Vamos tener un dashboard de estudiantes, con busqueda y creacion</li>
          <li>Login con JWT emitido por nuestra NestJS API</li>
          <li>Ejemplos de SSR</li>
        </ul>
      </Section>
    </div>

  );
}
