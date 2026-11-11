import { getCurrentUser } from "@/lib/current-user";
import NewTicketForm from "./ticket-form";
import { redirect } from "next/navigation";

//server side component
const NewTicketPage = async() => {

    const user = await getCurrentUser();
    if(!user){
        redirect('/login')
    }

    return (
        <div className="min-h-screen flex bg-blue-50 justify-center items-center px-4">
            <NewTicketForm />
        </div>
    );
}

export default NewTicketPage;