import { getStudent, getStudents } from '@/lib/student-api';
import { Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import React, { Suspense } from 'react'

type Grade = { subject: string; grade: number};
type Student = {id: string; name: string; email:string; nickname:string; grades?: Grade[] };

async function getStudentById(id:string){
    "use cache"
    cacheLife("minutes");
    cacheTag("students", `student-${id}`)

    const student: Student = await getStudent(id);
    return { student, generatedAt: new Date().toISOString()};
}

export async function  generateStaticParams(){
    const students: Student[] = await getStudents();
    return students.map((student) => ({ id: student.id}));
}

async function generateMetadata({params} : PageProps<"/students/[id]">): Promise<Metadata>{
 const {id} = await params;
 const {student} = await getStudentById(id);
 return {title: student.name, description: `Profile of ${student.name}`}
}

async function StudentDetail({params} : Pick<PageProps<"/students/[id]">, "params">) {
    const {id}= await params;
    const {student, generatedAt} = await getStudentById(id);
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
