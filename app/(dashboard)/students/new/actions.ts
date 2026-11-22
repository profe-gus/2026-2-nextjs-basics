"use server"

import { ApiError } from "@/lib/api";
import { getToken } from "@/lib/session";
import { createStudent, NewStudent } from "@/lib/student-api";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

export type StudentFormState = { error? : string};


export async function createStudentAction(
    _prev: StudentFormState, formData : FormData
): Promise<StudentFormState> {
    const token = await getToken();
    if(!token) redirect("/login?from=/students/new");

    const student: NewStudent = {
        name : String(formData.get("name") ?? "").trim(),
        age : Number(formData.get("age") ?? ""),
        email : String(formData.get("email") ?? "").trim(),
        gender : String(formData.get("gender") ?? "") as NewStudent["gender"],
        isActive : formData.get("isActive") === "on",
        favoriteSubjects : String(formData.get("favoriteSubjects") ?? "")
        .split(",")
        .map((subject) => subject.trim())
        .filter(Boolean)
    }

    let id: string;

    try{
        ({id} = await createStudent(student, token));
    }catch(error){
        if(error instanceof ApiError && error.status === 401) redirect("/login?from=/students/new")
        if(error instanceof ApiError && error.status === 403) {
            return { error: "Solo los profesores pueden crear estudiantes"}
        }
        return { error : error instanceof ApiError ? error.message : "Error inesperado, contacte a su admin" }

    }

    updateTag("students");
    redirect(`/students/${id}`);
}