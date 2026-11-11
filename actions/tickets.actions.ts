"use server";

import { prisma } from "@/db/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { revalidatePath } from "next/cache";

export const createTicket = async (
  prevState: { success: boolean; message: string },
  formData: FormData,
): Promise<{ success: boolean; message: string }> => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return {
        success: false,
        message: "You must be logged in to create new ticket.",
      };
    }

    const subject = formData.get("subject") as string;
    const description = formData.get("description") as string;
    const priority = formData.get("priority") as string;

    if (!subject || !description || !priority) {
      return { success: false, message: "All fields are required" };
    }
    //Create new ticket
    const ticket = await prisma.ticket.create({
      data: {
        subject,
        description,
        priority,
        user: {
          connect: { id: user.id },
        },
      },
    });

    revalidatePath("/tickets");
    return { success: true, message: "Ticket created successfully" };
  } catch (error) {
    console.error("error of sumitting ticket", error);
    return {
      success: false,
      message: "An error occured while creating the ticket.",
    };
  }
};

export const getTicket = async () => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return [];
    }

    const tickets = await prisma.ticket.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return tickets;
  } catch (error) {
    console.error("Error in fetching tickets", error);
    return [];
  }
};

export const getTicketById = async (id: string) => {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(id) },
    });

    return ticket;
  } catch (error) {
    console.error("Error while getting ticket by id", error);
    return null;
  }
};

export const closeTicket = async (
  prevState: { success: boolean; message: string },
  formData: FormData,
): Promise<{ success: boolean; message: string }> => {
  try {
    const ticketId = Number(formData.get("ticketId"))
    if(!ticketId){
      return { success: false, message: 'TicketID is required.'}
    }

    const user = await getCurrentUser();
    if(!user){
      return { success: false, message: 'You must be logged in to perform this action.' } 
    }

    const ticket = await prisma.ticket.findUnique({
      where: { id: ticketId }
    })

    if(!ticket || ticket.userId !== user.id){
      return { success: false, message: 'You are not authorized to close this ticket.'}
    }

    await prisma.ticket.update({
      where: { id: ticketId },
      data: { status: 'Closed' }
    })

    revalidatePath('/tickets')
    revalidatePath(`/tickets/${ticketId}`)

    return { success: true, message: 'Ticket closed successfully.'}

  } catch (error) {
    return { success: false, message: 'Could not close ticket. Please try again.'}
  }
};
