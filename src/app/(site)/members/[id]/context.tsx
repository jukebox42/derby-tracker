"use client";

import React from "react";

import { Member, MemberContact } from "@prisma/client";

type ContextProps = {
  member: Member,
  memberContact?: MemberContact,
}

const PageContext = React.createContext<ContextProps | undefined>(undefined);

type Props = {
  member: Member,
  memberContact?: MemberContact,
  children: React.ReactNode,
}

export const PageProvider = ({ member, memberContact, children }: Props) => (
  <PageContext.Provider value={ { member, memberContact } }>
    {children}
  </PageContext.Provider>
);

export const usePage = () => {
  const context = React.useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePage must be used within a PageProvider.");
  }
  return context;
}