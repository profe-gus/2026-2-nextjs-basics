import { Section } from '@/components/Section'
import { StudentTable } from '@/components/students/StudentTable'
import { Student } from '@/interfaces/student.interface';


const apiStudents = await fetch(`${process.env.API_URL}/student`);
const students: Student[] = await apiStudents.json(); 
console.log("🚀 ~ :8 ~ students:", students)


export default function StudentPage() {


  return (
     <Section id="students" title="Students">
              <StudentTable students={students}/>
      </Section>
  )
}

