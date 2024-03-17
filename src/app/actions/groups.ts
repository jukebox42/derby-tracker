"use server"
import { Group, Permission, Prisma, Session } from "@prisma/client";
import prisma from "#/lib/prisma";

import { check as checkAccess, get as getAccess } from "./access";
import { ActionResponseType, formatResponse, formatThrownErrorResponse, genericActionErrors, hasPermission } from ".";
import { validationSchema } from "#/lib/data/group";

/**
 * Protected Action
 * 
 * Returns a list of groups.
 */
export const list = async (filters?: Prisma.GroupWhereInput) => {
  const isOk = await checkAccess([Permission.GROUP_READ, Permission.GROUP_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  try {
    const groups = await prisma.group.findMany({
      where: filters
    });

    return formatResponse<Group[]>(groups);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}

/**
 * Protected Action
 * 
 * Returns a list of groups.
 */
export const listByMember = async (filters?: ({ memberId: string } & Omit<Prisma.GroupWhereInput, "id">)) => {
  if (!filters?.memberId) {
    return genericActionErrors.invalid("memberId is required.");
  }
  // Stop bad actors from sending in a groupId.
  if ((filters as any)?.id) {
    return genericActionErrors.invalid();
  }
  const isOk = await checkAccess([Permission.GROUP_READ, Permission.GROUP_MANAGE], filters.memberId);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }
  const { memberId, ...groupFilters } = filters;

  try {
    const groupMember = await prisma.memberGroup.findMany({
      where: { memberId }
    });

    if (!groupMember) {
      return genericActionErrors.notFound();
    }
    const groups = await prisma.group.findMany({
      where: { 
        id: {
          in: groupMember.map(g => g.groupId)
        },
        ...groupFilters,
      }
    });

    return formatResponse<Group[]>(groups);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}

/**
 * Protected Action
 * 
 * Returns a specific member.
 */
export const get = async (filters: Prisma.GroupWhereInput) => {
  const id = typeof filters.id === "string" ? filters.id : undefined;
  const isOk = await checkAccess([Permission.GROUP_READ, Permission.GROUP_MANAGE], id);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  try {
    const group = await prisma.group.findUnique({
      where: filters as any,
    });

    if (!group) {
      return genericActionErrors.notFound();
    }

    return formatResponse<Group>(group);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}

/**
 * Protected Action
 * 
 * Creates a new group
 */
export const create = async (group: Omit<Group, "id" | "createdAt" | "updatedAt">) => {
  const isOk = await checkAccess([Permission.GROUP_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  const cleanGroup = {
    name: group.name,
    description: group.description,
    permissions: group.permissions,
  }

  try {
    await validationSchema.validate(cleanGroup);

    const newGroup = await prisma.group.create({
      data: { ...cleanGroup }
    });

    return formatResponse<Group>(newGroup);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}

/**
 * Protected Action
 * 
 * Edit an existing group
 */
export const edit = async (id: string, group: Omit<Group, "id" | "createdAt" | "updatedAt">) => {
  const isOk = await checkAccess([Permission.GROUP_MANAGE]);
  if (isOk.type === ActionResponseType.ERROR) {
    return isOk;
  }

  const cleanGroup = {
    name: group.name,
    description: group.description,
    permissions: group.permissions,
  }

  try {
    await validationSchema.validate(cleanGroup);

    const editGroup = await prisma.group.update({
      where: { id },
      data: { ...cleanGroup }
    });

    return formatResponse<Group>(editGroup);
  } catch(e) {
    return formatThrownErrorResponse(e);
  }
}

/**
 * Protected Action
 * 
 * Check if a user can manage a group. Will return true if they have the group manage permission OR are in the group and
 * have the group admin permission.
 */
export const canManageGroup = async (groupId: string) => {
  const access = await getAccess();
  if (access.type === ActionResponseType.ERROR) {
    return formatResponse(false);
  }

  if(!hasPermission([Permission.GROUP_MANAGE], access.data) || !DO_NOT_IMPORT_canManageGroup(groupId, access.data)) {
    return formatResponse(false);
  }

  return formatResponse(true);
}

// Private Functions

export const DO_NOT_IMPORT_canManageGroup = async (groupId: string, session: Session) => {
  if(!hasPermission([Permission.GROUP_ADMIN], session)) {
    return false;
  }

  try {
    const count = await prisma.memberGroup.count({
      where: { groupId: groupId, memberId: session.memberId }
    });

    if (!count) {
      return false;
    }

    return true;
  } catch (e) {
    console.log("DO_NOT_IMPORT_canManageGroup error", e);
    return false;
  }
};