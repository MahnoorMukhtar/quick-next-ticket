import Link from "next/link"
import { FaTicketAlt } from "react-icons/fa";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen ">
      <h1 className="text-4xl text-blue-500 font-bold mb-2">Welcome to Quick Ticket</h1>
      <p className="text-lg text-gray-600">Fast and simple support ticket mangagement system.</p>
      <div className="flex flex-col text-center mt-4 gap-3">
        <Link href="/" className="bg-blue-600 font-semibold rounded text-white p-3 shadow hover:bg-blue-700 transition">
          Submit a Ticket
        </Link>
        <Link href="/" className="bg-blue-100 rounded p-3 font-semibold text-gray-700 shadow hover:bg-blue-200 transition">
          View Tickets
        </Link>
      </div>
    </main>
  );
}