import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-white p-4 border-b border-gray-200 flex justify-between items-center">
            <div>
                <Link href="/" className="text-blue-600 text-xl font-bold">
                    QuickTicket
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/tickets/new" className="hover:underline text-gray-700 transition">
                    New Ticket
                </Link>
                <Link href="/tickets" className="hover:underline text-gray-700 transition">
                    My Tickets
                </Link>
                <Link href="/login" className="text-blue-600 hover:underline transition">
                    Login
                </Link>
                <Link href="/register" className=" bg-blue-600 transition hover:bg-blue-700 text-white text-center rounded py-1 px-4">
                    Register
                </Link>
                <Link href="/logout" className=" bg-red-600 transition hover:bg-red-700 text-white text-center rounded py-1 px-4">
                    Logout
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;