import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebaseConfig";

export async function registerUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function loginUser(email: string, password: string){
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email, password );
    return userCredential.user;
  } catch(error: any){
    throw new Error(error.message);
  }
}

export async function logoutUser(){
  try{
    await signOut(auth);
  }catch (error: any){
    throw new Error(error.message);
  }
}