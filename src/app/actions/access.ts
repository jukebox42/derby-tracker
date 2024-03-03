"use server"
import { Permission } from "@prisma/client";
import { check as checkAuth } from "./auth";
import { ActionResponseType, formatResponse, genericActionErrors } from "./utils";

/**
 * Unprotected Action
 * 
 * Used to check if a user has a selected set of permission. This has a side effect of refreshing the user's session.
 * 
 * @param permissions - An array of permissions to validate against. 
 * @param selfMemberId - When provided, will return true even if the permission is missing if the selfMemberId matches
 *                       the one in the session. This is useful for letting members update their own stats.
 * @returns 
 */
export const check = async (permissions: Permission[], selfMemberId?: string) => {
  const session = await checkAuth();
  if (session.type === ActionResponseType.ERROR) {
    return genericActionErrors.permissionDenied();
  }

  if (selfMemberId === session.data.memberId) {
    return formatResponse(true);
  }

  const perms = session.data.permissions;
  return formatResponse(!!permissions.find(p => perms.includes(p)));
}

/**
 * Unprotected Action
 * 
 * Used to get a user's permissions. This has a side effect of refreshing the user's session.
 */
export const get = async () => {
  const session = await checkAuth();
  if (session.type === ActionResponseType.ERROR) {
    return genericActionErrors.permissionDenied();
  }

  return formatResponse(session.data);
}