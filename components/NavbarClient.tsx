'use client';

import { logoutUser } from "@/actions/auth.actions";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast } from "sonner";

type NavProps = {
    user: {
        id: string,
        name: string | null,
        email: string
    } | null
}

const NavbarClient = ({user}: NavProps) => {

    const [open, setOpen] = useState(false)
    const close = () => setOpen(false)

    const linkClass = "hover:underline text-gray-700 transition";

    const initialState = {
        success: false,
        message: ''
    }
    const [state, formAction] = useActionState(logoutUser, initialState)
    
    useEffect(()=>{
        if(state.success){
            toast.success('Logout Successfully.')
        }else if(state.message){
            toast.error(state.message)
        }
    },[state])

    return (
        <nav className="bg-white p-4 border-b border-gray-200">
            <div className="flex justify-between items-center p-2">
                <Link href="/" className="text-blue-600 text-xl font-bold">
                    QuickTicket
                </Link>

                <button
                    className="md:hidden text-gray-700 p-1"
                    aria-label="Toggle Menu"
                    aria-expanded={open}
                    onClick={() => setOpen(!open)}
                >
                    {open ? <FaTimes size={20} /> : <FaBars />}
                </button>
                <div className="hidden md:flex items-center gap-4">
                    {
                        user ? (
                            <>
                                <Link href="/tickets/new" className={linkClass}>
                                    New Ticket
                                </Link>
                                <Link href="/tickets" className={linkClass}>
                                    My Tickets
                                </Link>
                                <form action={formAction}>
                                    <button className=" bg-red-600 transition hover:bg-red-700 text-white text-center rounded py-1 px-4 cursor-pointer">
                                        Logout
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-blue-600 hover:underline transition">
                                    Login
                                </Link>
                                <Link href="/register" className=" bg-blue-600 transition hover:bg-blue-700 text-white text-center rounded py-1 px-4">
                                    Register
                                </Link>

                            </>

                        )
                    }
                </div>
            </div>

            {open && (
                <div className="md:hidden flex flex-col gap-3 p-3 border-t border-gray-100">
                    {
                        user ? (
                            <>
                                <Link href="/tickets/new" onClick={close} className={linkClass}>
                                    New Ticket
                                </Link>
                                <Link href="/tickets" onClick={close} className={linkClass}>
                                    My Tickets
                                </Link>
                                <form action={formAction}>
                                    <button onClick={close} className=" bg-red-600 transition hover:bg-red-700 text-white text-center rounded py-1 px-4 cursor-pointer">
                                        Logout
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link href="/login" onClick={close} className="text-blue-600 hover:underline transition">
                                    Login
                                </Link>
                                <Link href="/register" onClick={close} className=" bg-blue-600 transition hover:bg-blue-700 text-white text-center rounded py-1 px-4">
                                    Register
                                </Link>
                            </>
                        )
                    }

                </div>
            )
            }
        </nav>
    );
}

export default NavbarClient;

