"use server"

import { MemberContact, Permission, Prisma } from "@prisma/client";

import prisma from "#/lib/prisma";

import { check as checkAccess } from "./access";
import { ActionResponseType, formatResponse, formatThrownErrorResponse, genericActionErrors } from ".";
import { validationSchema } from "#/lib/data/memberContact";

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

  try {
    const memberContact = await prisma.memberContact.findUnique({
      where: filters as any
    });

    if (!memberContact) {
      return genericActionErrors.notFound();
    }

    return formatResponse<MemberContact>(memberContact);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}

/**
 * Protected Action
 * 
 * Edit an existing memberContact or create one if none exist.
 */
export const edit = async (memberId: string, contact: Omit<MemberContact, "memberId">) => {
  const isOk = await checkAccess([Permission.GROUP_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  const cleanContact = {
    personalEmail: contact.personalEmail,
    phone: contact.phone,
    address: contact.address,
    city: contact.city,
    state: contact.state,
    zip: contact.zip,
  }

  try {
    await validationSchema.validate(cleanContact);

    const result = await prisma.memberContact.upsert({
      where: { memberId },
      update: { ...cleanContact },
      create: { 
        memberId,
        ...cleanContact,
       }
    });

    return formatResponse<MemberContact>(result);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}