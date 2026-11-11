
import { Section } from '@/components/Section'
import { StudentTable } from '@/components/students/StudentTable'
import { Student } from '@/interfaces/student.interface';
import { filterStudents, paginate } from '@/lib/student-list';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { getStudents } from '@/lib/student-api';
import { Paginator } from '@/components/Paginator';
import { StudentSearch } from '@/components/students/StudentSearch';

const PAGE_SIZE = 6;


async function StudentResults({searchParams}: Pick<PageProps<"/students">, "searchParams">){
  const {q, page} = await searchParams;
  const term = typeof q === "string" ? q: "";

  const studentList: Student[] = await getStudents(); 
  await connection();

  const refinedList = filterStudents(studentList, term);
  const {students, current, totalPages, total} = paginate(refinedList, Number(page) || 1, PAGE_SIZE);

  return (
  <>
    <p className='text-xs text-gray-500'>Actualizado el {new Date().toISOString()}</p>
    {
      students.length > 0 ? (
        <StudentTable students={students}/>
      ): (
        <p className='rounded-lg bg-white p-6 text-center text-slate-500'>No se encontraron estudiantes con {term}</p>
      )}
      <footer className='flex flex-wrap items-center justify-between gap-3'>
        <p className='text-sm text-slate-500'>{total} estudiantes</p>
        <Paginator
        basePath='/students'
        page={current}
        totalPages={totalPages}
        params={term ? {q : term}: {}}
        />
      </footer>
  </>
    )
  
}


export default function StudentPage({searchParams}: PageProps<"/students">) {


  return (
     <Section id="students" title="Estudiantes">
      <Suspense>
        <StudentSearch/>
      </Suspense>
      <Suspense fallback={<p className='text-2xl text-gray-500'>Cargando estudiantes...</p>}>
              <StudentResults searchParams={searchParams}/>
      </Suspense>
      </Section>
  )
}

