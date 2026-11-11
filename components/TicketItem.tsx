import type { Ticket } from "@/app/generated/prisma/client";
import { getPriorityClass } from "@/utils/ui";
import Link from "next/link";

type TicketItemProp = {
    ticket: Ticket
}

const TicketItem = ({ ticket }: TicketItemProp) => {

    const isClosed = ticket.status === 'Closed';

    return (
        <div key={ticket.id} className={`flex justify-between items-center p-3 bg-white rounded shadow border border-gray-200 ${isClosed ? 'opacity-50' : ''}`}>
            <div>
                <h2 className="text-xl font-semibold text-blue-800">
                    {ticket.subject}
                </h2>
            </div>
            <div className="text-right space-y-4">
                <div className="text-sm textgray-500">
                    Priority <span className={getPriorityClass(ticket.priority)}>{ticket.priority}</span>
                </div>
                <Link
                    href={`/tickets/${ticket.id}`}
                    className={`px-3 py-1 mt-2 rounded text-sm transition text-center 
                    ${isClosed ? 'bg-gray-400 text-gray-700 cursor-not-allowed pointer-events-none' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>
                    View Ticket
                </Link>
            </div>
        </div>
    );
}

export default TicketItem;