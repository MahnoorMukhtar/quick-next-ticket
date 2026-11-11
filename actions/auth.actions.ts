"use server";

import { prisma } from "@/db/prisma";
import { removeAuthCookie, setAuthCookie, signAuthToken } from "@/lib/auth";
import bcrypt from "bcryptjs";

type ResponseResult = {
  success: boolean;
  message: string;
};

export async function registerUser(
  prevState: ResponseResult,
  formData: FormData,
): Promise<ResponseResult> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
      return { success: false, message: "All fields are required" };
    }

    //check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = await signAuthToken({ userId: user.id });
    await setAuthCookie(token);

    return { success: true, message: "Registeration " };
  } catch (error) {
    console.error("ERror in registering user", error);
    return {
      success: false,
      message: "Something went wrong please try again.",
    };
  }
}

//login user action
export async function loginUser(prevState: ResponseResult,
  formData: FormData,
): Promise<ResponseResult> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, message: "Email and Password are required" };
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return { success: false, message: "Invalid Email or Password" };
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (!passwordsMatch) {
      return { success: false, message: "Invalid credentials" };
    }
    const token = await signAuthToken({ userId: user.id });
    await setAuthCookie(token);

    return { success: true, message: "Login Successfull." };
  } catch (error) {
    console.error("Error in getting user logged in", error);
    return { success: false, message: "Login Failed. Please try again." };
  }
}

//Logout user and remove auth cookie
export async function logoutUser(): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    await removeAuthCookie();
    return { success: true, message: "Logout Successfully" };
  } catch (error) {
    console.error("Error in logging out user", error);
    return { success: false, message: "Logout Failed. Please Try Again." };
  }
}
