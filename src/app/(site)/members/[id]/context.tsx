"use client";

import React, { useState } from "react";

import { Member, MemberContact } from "@prisma/client";

type ContextProps = {
  member: Member,
  memberContact?: MemberContact,
  setMember: (data: Member) => void,
  setMemberContact: (data: MemberContact) => void,
}

const PageContext = React.createContext<ContextProps | undefined>(undefined);

type Props = {
  member: Member,
  memberContact?: MemberContact,
  children: React.ReactNode,
}

export const PageProvider = ({ member, memberContact, children }: Props) => {
  const [intMember, setIntMember] = useState(member);
  const [intMemberContact, setIntMemberContact] = useState(memberContact);

  return (
    <PageContext.Provider value={{
      member: intMember,
      setMember: (data: Member) => setIntMember(data),
      memberContact: intMemberContact,
      setMemberContact: (data: MemberContact) => setIntMemberContact(data),
    }}>
      {children}
    </PageContext.Provider>
  );
}

export const usePage = () => {
  const context = React.useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePage must be used within a PageProvider.");
  }
  return context;
}