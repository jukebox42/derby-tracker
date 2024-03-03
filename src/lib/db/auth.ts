"use server";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "./utils";

/**
 * Create a session cookie.
 */
export const createCookie = (session: { id: string, memberId: string }) => {
  const cookieFlags = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // One week
    path: "/",
  }
  return cookies().set(SESSION_COOKIE_NAME, JSON.stringify(session), cookieFlags);
}