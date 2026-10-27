
export default function Home() {

  const students = [
    {
      id:1,
      name:"Gustavo",
      age:35,
      email:"gus@mail.com",
      gender:"Male",
      nickname:"ProfeGus",
      status:true
    },
    {
      id:2,
      name:"Camilo",
      age:20,
      email:"camilo@mail.com",
      gender:"Male",
      nickname:"Cami",
      status:true
    },
    {
      id:3,
      name:"Sebastian",
      age:23,
      email:"sebas@mail.com",
      gender:"Male",
      nickname:"Sebas",
      status:false
    },
    {
      id:4,
      name:"Ximena",
      age:24,
      email:"xime@mail.com",
      gender:"Male",
      nickname:"Xime",
      status:true
    }
  ]

  return (

    <div className="min-h-screen">

      <nav className="flex items-center gap-6 bg-gray-900 px-6 py-4 text-slate-300">
        <a href="#" className="mr-auto text-lg font-bold text-white">
          Dash
        <span className="text-blue-500">Students</span>
        </a>
        <a href="#student" className="hover:text-white">
          Students
        </a>
        <a href="#about" className="hover:text-white">
          About
        </a>
      </nav>

      <main className="mx-auto max-w-5xl space-y-12 p-6">
      
        <section id="students" className="space-y-4">
          <h2 className="text-2xl font-bold">Students</h2>
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
                {
                  students ? students.map((student) => (
                <tr key={student.id} className="border-b border-slate-200 bg-slate-600">
                  <td className="p-3">
                    <p className="font-semibold text-lg">{student.name}</p>
                    <p className="text-slate-400">{student.nickname}</p>
                  </td>
                  <td className="p-3">{student.age}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">{student.gender}</td>
                  <td className="p-3">
                    {
                      student.status ? 
                      ( <span className="rounded-full bg-green-100 px-2 
                      py-0.5 text-xs font-medium text-green-700">
                          Active
                        </span> ) 
                      : 
                      ( <span className="rounded-full bg-gray-100 px-2 
                      py-0.5 text-xs font-medium text-gray-700">
                          Inactive
                        </span> )
                    }
                  </td>
                </tr>
                    
                  )) : ""
                }
              </tbody>
            </table>
          </div>
        </section>

        <section id="about" className="space-y-4">
          <h2 className="text-2xl font-bold">About this project</h2>
          <p className="text-slate-600">
            A Next.js frontend for NestJS + Postgres API we built in class. For now the data
            is
            written by hand
          </p>
        </section>
      </main>

    

    </div>

  );
}
