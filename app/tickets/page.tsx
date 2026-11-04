import { getTicket } from "@/actions/tickets.actions";
import { getPriorityClass } from "@/utils/ui";
import Link from "next/link";

const TicketsPage = async () => {

    const tickets = await getTicket()
    console.log("ticktes", tickets)


    return (
        <div className="min-h-screen bg-blue-50 p-8">
            <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
                Support Tickets
            </h1>
            {tickets.length == 0 ? (
                <p className="text-center text-gray-600">
                    No Ticktes yet
                </p>
            ) : (
                <div className="space-y-4 max-w-3xl mx-auto text-center">
                    {tickets.map((ticket) => (
                        <div key={ticket.id} className="flex justify-between items-center p-3 bg-white rounded shadow border border-gray-200">
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
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 mt-2 rounded text-sm transition text-center">
                                    View Ticket
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            )}
        </div>
    );
}

export default TicketsPage;