import { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import React, { Suspense } from 'react'

type Grade = { subject: string; grade: number};
type Student = {id: string; name: string; email:string; nickname:string; grades?: Grade[] };

async function getStudent(id:string){
    "use cache"
    cacheLife("minutes");
    cacheTag("students", `student-${id}`)

    const responseApi= await fetch(`${process.env.API_URL}/student/${id}`);
    if(!responseApi.ok) throw new Error(`Student ${id} could not be loaded`);
    const student: Student = await responseApi.json();
    return { student, generatedAt: new Date().toISOString()};
}

export async function  generateStaticParams(){
    const responseApi= await fetch(`${process.env.API_URL}/student`);
    const students: Student[] = await responseApi.json();
    return students.map((student) => ({ id: student.id}));
}

async function generateMetadata({params} : PageProps<"/students/[id]">): Promise<Metadata>{
 const {id} = await params;
 const {student} = await getStudent(id);
 return {title: student.name, description: `Profile of ${student.name}`}
}

async function StudentDetail({params} : Pick<PageProps<"/students/[id]">, "params">) {
    const {id}= await params;
    const {student, generatedAt} = await getStudent(id);
  return (
    <article className='space-y-3'>
        <h1 className='text-2xl font-bold'>{student.name}</h1>
        <p>
            Email: {student.email}
        </p>
        <p>
            Nickname: @{student.nickname}
        </p>
        <ul>
            <span className='font-bold text-xl'>Materias:</span>
            {student.grades?.map((grade)=>(
                <li key={grade.subject}>
                    {grade.subject}: {grade.grade}
                </li>
            ))}
        </ul>
        <p className='text-xs text-gray-500'> Generado el {generatedAt}</p>
    </article>
  )
}

export default function StudentDetailPage({params} : Pick<PageProps<"/students/[id]">, "params">) {
  return (
    <Suspense fallback={<p>Cargando estudiante...</p>}>
        <StudentDetail params={params}/>
    </Suspense>
  )
}
