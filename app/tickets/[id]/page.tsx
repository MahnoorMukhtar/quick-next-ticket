import { getTicketById } from "@/actions/tickets.actions";
import { getPriorityClass } from "@/utils/ui";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

const TicketDetailPage = async(props: {params: Promise<{id: string}>}) => {

    const { id } = await props.params
    const ticket = await getTicketById(id)

    if(!ticket){
        notFound()
    }

    return ( 
        <div className="min-h-screen bg-blue-50 p-8">
            <div className="bg-white w-full max-w-2xl mx-auto rounded shadow border border-gray-200 p-8 space-y-6">
                <h1 className="font-bold text-blue-600 text-3xl">{ticket.subject}</h1>
                <div className="text-gray-700">
                    <p className="font-semibold mb-2 text-lg">Description</p>
                    <p>{ticket.description}</p>
                </div>
                <div className="text-gray-700">
                    <p className="font-semibold mb-2 text-lg">Priority</p>
                    <p className={getPriorityClass(ticket.priority)}>{ticket.priority}</p>
                </div>
                <div className="text-gray-700">
                    <p className="font-semibold mb-2 text-lg">Created At</p>
                    <p>{new Date(ticket.createdAt).toLocaleString()}</p>
                </div>
                <Link href='/tickets' className="inline-flex gap-2 items-center bg-blue-600 transition hover:bg-blue-700 text-white text-center rounded py-2 px-4">
                   <FaArrowLeft size={10}/> Back to Tickets
                </Link>
            </div>
        </div>
     );
}
 
export default TicketDetailPage;