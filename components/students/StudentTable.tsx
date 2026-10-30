import { Student } from '@/interfaces/student.interface'
import React from 'react'
import { StudentRow } from './StudentRow'

export const StudentTable = ({students} : {students : Student[]}) => {
  return (
    <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
             <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Age</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Gender</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                { students ? students.map((student) => (
                    <StudentRow key={student.id} student={student}/>
                )): ""}
              </tbody>
        </table>
    </div>
  )
}
