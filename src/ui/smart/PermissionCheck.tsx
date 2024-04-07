import React from "react";

import { Permission } from "@prisma/client";

import { useSite } from "#/context";

type Props = {
  permissions?: Permission[],
  memberId?: string,
  children: React.ReactNode
}

export const PermissionCheck = ({ permissions, memberId, children }: Props) => {
  const { hasAccess, session } = useSite(permissions);
  const canDo = hasAccess || session.memberId === memberId;

  if (!canDo) {
    return <></>;
  }

  return (
    <>
      {children}
    </>
  );
}