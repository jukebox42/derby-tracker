import { Permission } from "@prisma/client";

import prisma from "../prisma";

/**
 * Get access for a userid
 */
export const getAccess = async (memberId: string) => {
  const memberRoles = await prisma.memberGroup.findMany({
    where: { memberId },
    include: { groups: true }
  });

  if (!memberRoles) {
    return [];
  }

  const permissions = new Set(
    [].concat(
      ...memberRoles.map(m => m.groups.permissions as any)
    )
  );

  return Array.from(permissions) as Permission[];
}