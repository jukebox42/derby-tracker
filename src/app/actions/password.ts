"use server"
import { default as bcrypt } from "bcryptjs";

import prisma from "#/lib/prisma";
import { ActionErrorCodes, ActionResponseType, formatErrorResponse, formatResponse } from ".";
import { check as checkAccess } from "./access";

/**
 * Protected Action
 * 
 * Enables a user to change their own password.
 */
export const change = async (memberId: string, password: string, newPassword: string) => {
  const isOk = await checkAccess([], memberId);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  const invalidCreds = formatErrorResponse(ActionErrorCodes.AUTH_FAIL_INVALID, "Invalid credentials.");

  //try {
    const result = await prisma.password.findUnique({
      where: { 
        memberId,
      }
    });

    if (!result) {
      return invalidCreds;
    }

    if (!bcrypt.compareSync(password, result.password)) {
      return invalidCreds;
    }

    await prisma.password.update({
      where: { memberId },
      data: {
        password: bcrypt.hashSync(newPassword, 10),
      }
    })

    return formatResponse(true);
  /*} catch (e) {
    return formatThrownErrorResponse(e);
  }*/
}

/**
 * Unprotected Action
 * 
 * Used to reset a users password.
 */
/*export const reset = async (resetKey: string, password: string, newPassword: string) => {
  try {
    const result = await prisma.password.count({
      where: { 
        resetKey,
        password: bcrypt.hashSync(password, 10),
      }
    });

    if (!result) {
      return formatErrorResponse(ActionErrorCodes.AUTH_FAIL_INVALID, "Invalid credentials.");
    }

    await prisma.password.update({
      where: { resetKey },
      data: {
        password: bcrypt.hashSync(newPassword, 10),
      }
    })

    return formatResponse(true);
  } catch (e) {
    return formatThrownErrorResponse(e);
  }
}*/