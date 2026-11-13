"use server";
import { ApiError } from "@/lib/api";
import { login, register } from "@/lib/auth-api";
import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";

export type AuthFormState = { error?: string, email?:string};

export async function loginAction(_prev : AuthFormState, formData: FormData) {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    if(!email || password.length < 8){
        return {
            error : `Usuario o contrasena invalidos, 
            recuerde que la contrasena debe tener al menos 8 caracteres`, 
            email
        }
    }
    try{
        const {token} = await login(email, password);
        await createSession(token);
    }catch(error){
        if(error instanceof ApiError){
            return {error: "Usuario o contrasena incorrectos"}
        }
        return { error : `Hubo un problema con el 
            servidor, por favor contacte a su admin`}
    }

    redirect("/students");
    
}

export async function registerAction(_prev : AuthFormState, formData: FormData) {
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const password = String(formData.get("password") ?? "");
    const fullName = String(formData.get("fullName") ?? "").trim();

    try{
        const {token} = await register(email, password, fullName);
        await createSession(token);
    }catch(error){
        if(error instanceof ApiError){
            return {error: "Error al crear el usuario"}
        }
        return { error : `Hubo un problema con el 
            servidor, por favor contacte a su admin`}
    }

    redirect("/students");
    
}

export async function logoutAction() {
    await deleteSession();
    redirect("/login");
}