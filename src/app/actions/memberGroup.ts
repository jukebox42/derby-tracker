"use server"
import { MemberGroup, Permission } from "@prisma/client";
import prisma from "@/lib/prisma";

import { get as getAccess } from "./access";
import { ActionResponseType, formatResponse, genericActionErrors, hasPermission } from ".";
import { DO_NOT_IMPORT_canManageGroup } from "./groups";

/**
 * Protected Action
 * 
 * Add a member to a group.
 */
export const addMember = async (groupId: string, memberId: string) => {
  const access = await getAccess();
  if (access.type === ActionResponseType.ERROR) {
    return genericActionErrors.permissionDenied();
  }

  if(!hasPermission([Permission.GROUP_MANAGE], access.data) || !DO_NOT_IMPORT_canManageGroup(groupId, access.data)) {
    return genericActionErrors.permissionDenied();
  }

  const newRelation = await prisma.memberGroup.create({
    data: { memberId, groupId }
  });

  return formatResponse<MemberGroup>(newRelation);
}

/**
 * Protected Action
 * 
 * Remove a member from a group.
 */
export const removeMember = async (groupId: string, memberId: string) => {
  const access = await getAccess();
  if (access.type === ActionResponseType.ERROR) {
    return genericActionErrors.permissionDenied();
  }

  if(!hasPermission([Permission.GROUP_MANAGE], access.data) || !DO_NOT_IMPORT_canManageGroup(groupId, access.data)) {
    return genericActionErrors.permissionDenied();
  }

  await prisma.memberGroup.delete({
    where: { memberId_groupId: { memberId, groupId } }
  });

  return formatResponse<boolean>(true);
}