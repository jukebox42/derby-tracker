"use server"
import { Member, Permission, Prisma } from "@prisma/client";

import prisma from "@/lib/prisma";
import { validationSchema } from "@/lib/data/members";
import { check as checkAccess } from "./access";
import { ActionResponseType, formatResponse, genericActionErrors } from "./utils";

/**
 * Protected Action
 * 
 * Returns a list of members.
 */
export const list = async (filters?: Prisma.MemberWhereInput) => {
  const isOk = await checkAccess([Permission.MEMBER_READ, Permission.MEMBER_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  const members = await prisma.member.findMany({
    where: filters
  });

  return formatResponse<Member[]>(members);
}

/**
 * Protected Action
 * 
 * Returns a specific member.
 */
export const get = async (filters: Prisma.MemberWhereInput) => {
  const id = typeof filters.id === "string" ? filters.id : undefined;
  const isOk = await checkAccess([Permission.MEMBER_READ, Permission.MEMBER_MANAGE], id);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  const member = await prisma.member.findUnique({
    where: filters as any,
  });

  if (!member) {
    return genericActionErrors.notFound();
  }

  return formatResponse<Member>(member);
}

/**
 * Protected Action
 * 
 * Toggles a member's active state
 */
export const toggleActive = async (id: string, active = true) => {
  const isOk = await checkAccess([Permission.MEMBER_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  const response = await prisma.member.update({
    where: { id },
    data: {
      active,
    }
  });

  if (response.active) {
    return genericActionErrors.failed();
  }

  return formatResponse(true);
}

/**
 * Protected Action
 * 
 * Toggles a member's leave of absence
 */
export const toggleLoA = async (id: string, isOnLoa = true) => {
  const isOk = await checkAccess([Permission.MEMBER_MANAGE], id);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  const member = await prisma.member.update({
    where: { id },
    data: {
      isOnLoa,
    }
  });

  if (member.active) {
    return genericActionErrors.failed();
  }

  return formatResponse(true);
}

/**
 * Protected Action
 * 
 * Creates a new active member.
 */
export const create = async (member: Omit<Member, "id" | "createdAt" | "updatedAt" | "isOnLoa" | "active">) => {
  const isOk = await checkAccess([Permission.MEMBER_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  // Clean the object
  const cleanMember = {
    name: member.name,
    email: member.email,
    alias: member.alias ?? member.name,
    number: member.number ?? null,
    level: member.level,
    preferredPosition: member.preferredPosition ?? null,
  }

  try {
    await validationSchema.validate(cleanMember);
  } catch(e) {
    return genericActionErrors.invalid("" + e);
  }

  const newMember = await prisma.member.create({
    data: { ...cleanMember }
  });

  return formatResponse<Member>(newMember);
}

