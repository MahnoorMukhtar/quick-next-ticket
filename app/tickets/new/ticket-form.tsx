"use client";

import { useActionState, useEffect } from "react";
import { createTicket } from "@/actions/tickets.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const NewTicketForm = () => {

    const [state, formAction] = useActionState(createTicket, { success: false, message: "" });
    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            toast.success("Ticket submitted successfully.")
            router.push('/tickets')
        }
    }, [state.success, router])


    return (
        <main className="min-h-screen flex bg-blue-50 justify-center items-center px-4">
            <div className="bg-white border border-gray-200 rounded shadow-md p-8 w-full max-w-md">
                <h1 className="text-center font-bold text-2xl text-blue-600">Submit a Support Ticket</h1>
                {
                    state.message && !state.success && (
                        <p className="text-red-500 my-4 text-center">{state.message}</p>
                    )
                }
                <form action={formAction} className="flex flex-col gap-3 mt-4 text-gray-700">
                    <input
                        className="border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        type="text"
                        name="subject"
                        placeholder="Subject" />
                    <textarea
                        className="border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Describe your issue"
                        name="description"
                        id=""
                        rows={4}
                    ></textarea>
                    <select
                        className="border border-gray-300 rounded p-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        name="priority"
                        id=""
                    >
                        <option value="Low">Low Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="High">High Priority</option>
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-600 cursor-pointer text-white rounded font-medium shadow-md py-2 hover:bg-blue-700 transition disabled:opacity-50">
                        Submit
                    </button>
                </form>
            </div>
        </main>
    )
}

export default NewTicketForm;