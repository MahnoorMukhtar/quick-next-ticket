import NewTicketForm from "./ticket-form";

//server side component
const NewTicketPage = () => {
    return (
        <div className="min-h-screen flex bg-blue-50 justify-center items-center px-4">
            <NewTicketForm />
        </div>
    );
}

export default NewTicketPage;