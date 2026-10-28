import { Gender, Student } from "@/interfaces/student.interface";

export const students: Student[] = [
    {
      id:"001",
      name:"Gustavo",
      age:35,
      email:"gus@mail.com",
      gender:Gender.Male,
      favoriteSubjects: ["P.E", "Chemistry"],
      grades:[],
      nickname:"ProfeGus",
      isActive:true
    },
    {
      id:"002",
      name:"Camilo",
      age:20,
      email:"camilo@mail.com",
      gender:Gender.Male,
      nickname:"Cami",
      favoriteSubjects: ["P.E", "Chemistry"],
      grades:[],
      isActive:true
    },
    {
      id:"003",
      name:"Sebastian",
      age:23,
      email:"sebas@mail.com",
      gender:Gender.Male,
      nickname:"Sebas",
      favoriteSubjects: ["P.E", "Chemistry"],
      grades:[],
      isActive:false
    },
    {
      id:"004",
      name:"Ximena",
      age:24,
      email:"xime@mail.com",
      gender:Gender.Female,
      nickname:"Xime",
      favoriteSubjects: ["P.E", "Chemistry"],
      grades:[],
      isActive:true
    }
]