"use server"
import { cookies } from "next/headers"
import { default as bcrypt } from "bcryptjs";
import { Member, Session } from "@prisma/client";

import { getSession, createSession, deleteSession } from "#/lib/db/session";
import prisma from "#/lib/prisma";
import { CookieSession } from "./types";
import { ActionErrorCodes, ActionResponseType, formatErrorResponse, formatResponse } from "./utils";
import { createCookie } from "#/lib/db/auth";
import { SESSION_COOKIE_NAME } from "#/lib/db/utils";
import { memberActions } from ".";

const invalidCreds = formatErrorResponse(ActionErrorCodes.AUTH_FAIL_INVALID, "Invalid credentials.");

/**
 * Unprotected Action
 *
 * Handles validation login credentials and generating a session.
 */
export const login = async (email: string, password: string) => {
  try {
    // Don't let them login if they are inactive.
    const member = await prisma.member.findUnique({ where: { email, active: true }});
    if (!member) {
      return invalidCreds;
    }
  
    const passwordEntity = await prisma.password.findUnique({ where: { memberId: member.id }});
    if (!passwordEntity) {
      return invalidCreds;
    }
  
    if (!bcrypt.compareSync(password, passwordEntity.password)) {
      return invalidCreds;
    }
  
    const session = await createSession(member.id);

    if (!session) {
      return invalidCreds;
    }

    const cookieSession = { id: session.id, memberId: session.memberId };

    createCookie(cookieSession);

    return formatResponse<CookieSession>(cookieSession);
  } catch (e) {
    return formatErrorResponse(ActionErrorCodes.AUTH_FAIL_ERROR, "Server side error. " + e);
  }
}

const invalidSession = formatErrorResponse(ActionErrorCodes.SESSION_INVALID, "User not authenticated");

/**
 * Unprotected Action
 *
 * Handles redirecting to login if the user is not logged in.
 */
export const check = async () => {
  try {
    const cookie = cookies().get(SESSION_COOKIE_NAME);
    if (!cookie) {
      return invalidSession;
    }

    const cookieData = JSON.parse(cookie.value);
    if (!cookieData.id || !cookieData.memberId) {
      return invalidSession;
    }

    const session = await getSession(cookieData.id, cookieData.memberId);
    if(!session) {
      return invalidSession;
    }

    return formatResponse<Session>(session);
  } catch (e) {
    return formatErrorResponse(ActionErrorCodes.SESSION_ERROR, "" + e);
  }
}

/**
 * Unprotected Action
 *
 * Handles getting the active session and member. Returns false if there isn't one
 */
export const get = async () => {
  const session = await check();
  if (session.type === ActionResponseType.ERROR) {
    return invalidSession;
  }
  // We make sure they are active here. This prevents disabled users from staying authenticated.
  const member = await memberActions.get({ id: session.data.memberId, active: true });
  if (member.type === ActionResponseType.ERROR) {
    return invalidSession;
  }

  return formatResponse<{ session: Session, member: Member }>({ session: session.data, member: member.data });
}

/**
 * Unprotected Action
 *
 * Handles terminating the cookie and session
 */
export const logout = async () => {
  const done = formatResponse(true);
  try {
    const cookie = cookies().get(SESSION_COOKIE_NAME);
    if (!cookie) {
      return done;
    }

    const cookieData = JSON.parse(cookie.value);
    if (!cookieData.id || !cookieData.memberId) {
      cookies().delete(SESSION_COOKIE_NAME);
      return done;
    }

    await deleteSession(cookieData.id);
  } catch {}

  try {
    cookies().delete(SESSION_COOKIE_NAME);
  } catch {}

  return done;
}