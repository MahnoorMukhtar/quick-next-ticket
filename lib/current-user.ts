import { prisma } from "@/db/prisma"
import { getAuthCookie, verifyToken } from "./auth"

type AuthPayload = {
    userId: string
}

export const getCurrentUser =  async() =>{
    try {
        const token  = await getAuthCookie()
        if(!token) return null;

        const payload = (await verifyToken(token)) as AuthPayload;
        if(!payload?.userId) return null;

        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select : {
                id: true, name: true, email: true
            }
        })

        return user;

    } catch (error) {
        console.error("Error getting in current user", error);
        return null;
    }
}