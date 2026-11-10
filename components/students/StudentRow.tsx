import { Student } from '@/interfaces/student.interface'
import React from 'react'
import { StudentBadge } from './StudentBadge';
import Link from 'next/link';

export const StudentRow = ({student}:{ student : Student}) => {
  return (
    <tr className="border-b border-slate-200 bg-slate-600">
        <td className='p-3'>
          <Link href={`/students/${student.id}`} className='font-semibold text-blue-600 hover:underline'>
            <p className="font-semibold text-lg">{student.name}</p>
          </Link>
            <p className="text-slate-400">{student.nickname}</p>
        </td>
        <td className='p-3'>{student.age}</td>
        <td className='p-3'>{student.email}</td>
        <td className='p-3'>{student.gender}</td>
        <td className='p-3'>
            <StudentBadge active={student.isActive}/>
        </td>
    </tr>
  )
}
