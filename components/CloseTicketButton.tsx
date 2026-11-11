'use client';

import { closeTicket } from "@/actions/tickets.actions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const CloseTicketButton = ({ticketId, isClosed}: {ticketId: number, isClosed: boolean}) => {
     const initialState = {
        success: false,
        message: ''
    }
    const [state, formAction] = useActionState(closeTicket, initialState)
    
    useEffect(()=>{
        if(state.success){
            toast.success(state.message)
        }else if(state.message && !state.success){
            toast.error(state.message)
        }
    },[state])

    if(isClosed){
        return null
    }
    return ( 
        <form action={formAction}>
            <input type="hidden" name="ticketId" value={ticketId}/>
            <button className="bg-red-600 cursor-pointer text-white px-2 py-3 hover:bg-red-700 rounded w-full transition">
                Close Ticket
            </button>
        </form>
     );
}
 
export default CloseTicketButton;