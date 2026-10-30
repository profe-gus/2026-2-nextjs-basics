import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";
import { StudentTable } from "@/components/students/StudentTable";
import { students } from "@/data/students.mock";
import { NavLinks } from "@/interfaces/nav-links.interface";

const navLinks : NavLinks[] = [
  { 
    href: "students", 
    title: "Students"
  },
  { href: "about", title: "About"}
]

export default function Home() {

  return (

    <div className="min-h-screen">

     <Navbar links={navLinks}/>

      <main className="mx-auto max-w-5xl space-y-12 p-6">
      
       <Section id="students" title="Students">
          <StudentTable students={students}/>
        </Section>

        <Section id="about" title="About this project">
          <p>
            Hola mundo
          </p>
        </Section>

      </main>

    </div>

  );
}
