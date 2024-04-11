"use server"
import { MemberSocial, Permission } from "@prisma/client";

import prisma from "#/lib/prisma";

import { check as checkAccess } from "./access";
import { ActionResponseType, formatResponse, formatThrownErrorResponse } from ".";
import { validationSchema } from "#/lib/data/memberSocial";

/**
 * Protected Action
 * 
 * Edit an existing memberSocial or create one if none exist.
 */
export const edit = async (memberId: string, social: Omit<MemberSocial, "memberId">) => {
  const isOk = await checkAccess([Permission.GROUP_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  const cleanSocial = {
    slack: social.slack ?? null,
    facebook: social.facebook ?? null,
  };

  try {
    await validationSchema.validate(cleanSocial);

    const result = await prisma.memberSocial.upsert({
      where: { memberId },
      update: { ...cleanSocial },
      create: { 
        memberId,
        ...cleanSocial,
       }
    });

    return formatResponse<MemberSocial>(result);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}