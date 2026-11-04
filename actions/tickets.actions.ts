"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

export const createTicket = async (
  prevState: { success: boolean; message: string },
  formData: FormData,
): Promise<{ success: boolean; message: string }> => {
  try {
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
    const tickets =  await prisma.ticket.findMany({
        orderBy: { createdAt: 'desc'}
    })
    return tickets
  } catch (error) {
    console.error("Error in fetching tickets", error);
    return [];
  }
};


export const getTicketById = async(id: string) =>{
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(id) }
    })

    return ticket;
  } catch (error) {
    console.error("Error while getting ticket by id", error)
    return null;
  }
}
