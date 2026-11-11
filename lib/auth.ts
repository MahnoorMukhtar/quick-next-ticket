
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const secret = new TextEncoder().encode(process.env.AUTH_SECRET)
const cookieName = "auth-token";

//Encrypt and sign token
export async function signAuthToken(payload: any){
    try {
        const token = await new SignJWT(payload)
            .setProtectedHeader({alg: 'HS256'})
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(secret)
        return token;
    } catch (error) {
        console.error("Error in signing token", error)
        throw new Error("Token Signing failed")
    }
}


//Decrypt and verify token
export async function verifyToken<T>(token:string): Promise<T>{
    try {
        const { payload } = await jwtVerify(token, secret)
        return payload as T;
    } catch (error) {
        console.error("Error in verifying token", error)
        throw new Error("Token decrypt failed")
    }
}

//Set the auth cookie
export async function setAuthCookie(token:string){
    try {
        const cookieStore = await cookies()
        cookieStore.set(cookieName, token, {
            httpOnly: true,
            sameSite: 'lax',
            path:'/',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 *60 * 24 * 7
        })
    } catch (error) {
        console.error("Error in setting token in cookie", error)
        throw new Error("Could not set auth cookie")
    }
}

//Get token from cookie
export async function getAuthCookie(){
    const cookieStore = await cookies();
    const token  = cookieStore.get(cookieName);
    return token?.value
}

//Remove auth token cookie
export async function removeAuthCookie(){
    try {
        const cookieStore = await cookies();
        cookieStore.delete(cookieName)
    } catch (error) {
        console.error("ERROR in removing auth token from cookie", error)
    }
}