"use server"
import { Member, MemberContact, MemberSocial, Permission, Prisma } from "@prisma/client";

import prisma from "#/lib/prisma";
import { validationSchema } from "#/lib/data/members";
import { check as checkAccess, get as getAccess } from "./access";
import { ActionResponseType, formatThrownErrorResponse, formatResponse, genericActionErrors, hasPermission } from "./utils";
import { memberContactActions, memberSocialActions } from ".";

const memberWithInfo = Prisma.validator<Prisma.MemberDefaultArgs>()({
  include: { contact: true, social: true },
});

export type MemberWithInfo = Prisma.MemberGetPayload<typeof memberWithInfo>;

export type MemberEdit =
  Omit<Member, "id" | "isOnLoa" | "active" | "createdAt" | "updatedAt"> &
  { social: Omit<MemberSocial, "memberId"> } &
  { contact: Omit<MemberContact, "memberId"> };

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

  try {
    const members = await prisma.member.findMany({
      where: filters,
    });

    return formatResponse<Member[]>(members);
  } catch (e) {
    return formatThrownErrorResponse(e);
  }
}

/**
 * Protected Action
 * 
 * Returns a list of members by group id.
 */
export const listByGroup = async (filters?: { groupId: string } & Omit<Prisma.MemberWhereInput, "id">) => {
  if (!filters?.groupId) {
    return genericActionErrors.invalid("groupId is required.");
  }
  // Stop bad actors from sending in a memberId.
  if ((filters as any)?.id) {
    return genericActionErrors.invalid();
  }
  const isOk = await checkAccess([Permission.MEMBER_READ, Permission.MEMBER_MANAGE], filters.groupId);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }
  try {
    const { groupId, ...memberFilters } = filters;

    const groupMember = await prisma.memberGroup.findMany({
      where: { groupId }
    });

    if (!memberFilters) {
      return genericActionErrors.notFound();
    }
    const members = await prisma.member.findMany({
      where: { 
        id: {
          in: groupMember.map(m => m.memberId)
        },
        ...memberFilters,
      }
    });

    return formatResponse<Member[]>(members);
  } catch (e) {
    return formatThrownErrorResponse(e);
  }
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

  const access = await getAccess();
  if (access.type === ActionResponseType.ERROR) {
    return access;
  }

  try {
    const member = await prisma.member.findUnique({
      where: filters as any,
      include: {
       contact: hasPermission([Permission.MEMBER_MANAGE], access.data),
       social: true,
      }
    });

    if (!member) {
      return genericActionErrors.notFound();
    }

    return formatResponse<MemberWithInfo>(member);
  } catch (e) {
    return formatThrownErrorResponse(e);
  }
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

  try {
    const response = await prisma.member.update({
      where: { id },
      data: {
        active,
      }
    });
    return formatResponse(response.active);
  } catch (e) {
    return formatThrownErrorResponse(e);
  }
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

  try {
    const response = await prisma.member.update({
      where: { id },
      data: {
        isOnLoa,
      }
    });
    return formatResponse(response.isOnLoa);
  } catch (e) {
    return formatThrownErrorResponse(e);
  }
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
    pronouns: member.pronouns ?? null,
    number: member.number ?? null,
    level: member.level,
    preferredPosition: member.preferredPosition ?? null,
  }

  try {
    await validationSchema.validate(cleanMember);

    const newMember = await prisma.member.create({
      data: { ...cleanMember }
    });

    return formatResponse<Member>(newMember);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}

/**
 * Protected Action
 * 
 * Edit a member. It will create contact or social if they don't exist. Users can edit themselves but cannot change
 * their email address. Only admins can do that.
 */
export const edit = async (
  id: string,
  member: Omit<Member, "id" | "isOnLoa" | "active" | "createdAt" | "updatedAt">,
  social: Omit<MemberSocial, "memberId">,
  contact: Omit<MemberContact, "memberId">
) => {
  const session = await getAccess();
  if (session.type === ActionResponseType.ERROR) {
    return genericActionErrors.permissionDenied();
  }
  const isAdmin = hasPermission([Permission.MEMBER_MANAGE], session.data);
  if (!isAdmin && session.data.memberId !== id) {
    return genericActionErrors.permissionDenied();
  }

  const socialResult = await memberSocialActions.edit(id, social);
  if (socialResult.type === ActionResponseType.ERROR) {
    return socialResult;
  }
  const contactResult = await memberContactActions.edit(id, contact);
  if (contactResult.type === ActionResponseType.ERROR) {
    return contactResult;
  }

  const cleanMember = {
    name: member.name,
    ...(!isAdmin ? {} :{ email: member.email }), // don't let self change email address
    alias: member.alias ?? member.name,
    pronouns: member.pronouns ?? null,
    about: member.about ?? null,
    number: member.number ?? null,
    level: member.level,
    preferredPosition: member.preferredPosition ?? null,
  };

  try {
    await validationSchema.validate(cleanMember);

    const newMember = await prisma.member.update({
      data: { ...cleanMember },
      where: { id, },
      include: { contact: true, social: true }
    });

    return formatResponse<MemberWithInfo>(newMember);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}

