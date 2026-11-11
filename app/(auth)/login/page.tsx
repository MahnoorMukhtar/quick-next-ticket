'use client';

import { useActionState, useEffect } from "react";
import { loginUser, logoutUser, registerUser } from '../../../actions/auth.actions'
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LoginPage = () => {

    const router = useRouter()

    const initialState = {
        success: false,
        message: ''
    }
    const [state, formAction] = useActionState(loginUser, initialState)

    useEffect(()=>{
        if(state.success){
            toast.success(state.message)
            router.push('/tickets')
            router.refresh()
        }else if(state.message){
            toast.error(state.message)
        }
    }, [state, router])


    return (
         <main className="min-h-screen flex bg-blue-50 justify-center items-center px-4">
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 w-full max-w-md">
                <h1 className="text-center font-bold text-3xl text-blue-600">Login</h1>
                {
                    state.message && !state.success && (
                        <p className="text-red-500 my-4 text-center">{state.message}</p>
                    )
                }
                <form action={formAction} className="flex flex-col gap-5 mt-4 text-gray-700">
                     <input
                        className="w-full border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        autoComplete="email"
                        required    
                    />
                     <input
                        className="w-full border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="new-password"
                        required    
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 cursor-pointer text-white rounded font-medium shadow-md py-2 hover:bg-blue-700 transition disabled:opacity-50">
                        Login
                    </button>
                </form>
            </div>
        </main>
      );
}
 
export default LoginPage;