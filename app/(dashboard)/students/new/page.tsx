import { Section } from '@/components/Section'
import { StudentForm } from '@/components/students/StudentForm'

export default function NewStudentPage() {
  return (
    <Section title='Crear estudiante' id="crear estudiante">
        <StudentForm/>
    </Section>
  )
}
