"use server"

import { MemberContact, Permission, Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";

import { check as checkAccess } from "./access";
import { ActionResponseType, formatResponse, genericActionErrors } from ".";

/**
 * Protected Action
 * 
 * Returns a specific member contact.
 */
export const get = async (filters: Prisma.MemberContactWhereInput) => {
  const memberId = typeof filters.memberId === "string" ? filters.memberId : undefined;
  const isOk = await checkAccess([Permission.MEMBER_MANAGE], memberId);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  const memberContact = await prisma.memberContact.findUnique({
    where: filters as any
  });

  if (!memberContact) {
    return genericActionErrors.notFound();
  }

  return formatResponse<MemberContact>(memberContact);
}