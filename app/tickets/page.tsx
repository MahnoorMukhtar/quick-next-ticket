import { getTicket } from "@/actions/tickets.actions";
import TicketItem from "@/components/TicketItem";
import { getCurrentUser } from "@/lib/current-user";
import { getPriorityClass } from "@/utils/ui";
import Link from "next/link";
import { redirect } from "next/navigation";

const TicketsPage = async () => {

    const tickets = await getTicket()
    const user = await getCurrentUser()
    if(!user){
        redirect('/login')
    }

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
                        <TicketItem ticket={ticket} />
                    ))}
                </div>

            )}
        </div>
    );
}

export default TicketsPage;