import { cacheLife, cacheTag } from 'next/cache';
import { Grade, Student } from '../interfaces/student.interface';
import { api } from './api';


export type { Grade, Student}

export async function getStudents(limit: number = 1000){
    "use cache";
    cacheLife("minutes");
    cacheTag("students");

    const {data} = await api.get<Student[]>("/student", {params: {limit}});
    return data;
}
export async function getStudent(term: string){
    "use cache";
    cacheLife("minutes");
    cacheTag("student");

    try{
    const {data} = await api.get<Student>(`/student/${encodeURIComponent(term)}`);
    return data;
    }catch(error){
        throw error;
    }
}