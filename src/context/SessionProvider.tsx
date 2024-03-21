"use client"
import React from "react";

import { Member, Permission, Session } from "@prisma/client";
import { hasPermission } from "#/app/actions";
import { useRouter } from "next/navigation";

type ContextProps = {
  activeMember: Member,
  session: Session,
}

const SiteContext = React.createContext<ContextProps | undefined>(undefined);

type Props = {
  data: {
    activeMember: Member,
    session: Session,
  }
  children: React.ReactNode,
}

export const SiteProvider = ({ data: { activeMember, session }, children }: Props) => (
  <SiteContext.Provider value={ { activeMember, session } }>
    {children}
  </SiteContext.Provider>
);

/**
 * Returns the active sessions for the user.
 * 
 * If neither permissions or memberId is provided then  hasAccess will ALWAYS return true.
 * 
 * @param permissions If provided, will validate if the user has at least one provided permission.
 * @param failPath If provided, it will call a router push when a permissions request fails.
 * @param memberId If provided, will override the permissions check if the memberId matches the
 *                 logged in user. Useful for letting users manage their own information.
 */
export const useSite = (permissions?: Permission[], failPath?: string, memberId?: string) => {
  const context = React.useContext(SiteContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider.");
  }
  const router = useRouter();
  const hasAccess = !!permissions?.length ?
    hasPermission(permissions, context.session) || context.session.memberId === memberId :
    false;

  (!hasAccess && failPath) && router.push(failPath);

  return {
    ...context,
    hasAccess,
  };
};
