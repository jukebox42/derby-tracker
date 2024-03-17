"use client";

import React, { useState } from "react";

import { MemberWithInfo } from "#/app/actions/members";

type ContextProps = {
  member: MemberWithInfo,
  setMember: React.Dispatch<React.SetStateAction<MemberWithInfo>>,
}

const PageContext = React.createContext<ContextProps | undefined>(undefined);

type Props = {
  member: MemberWithInfo,
  children: React.ReactNode,
}

export const PageProvider = ({ member, children }: Props) => {
  const [intMember, setIntMember] = useState(member);

  return (
    <PageContext.Provider value={{
      member: intMember,
      setMember: setIntMember,
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