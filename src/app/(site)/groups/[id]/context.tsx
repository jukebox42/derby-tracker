"use client";

import React, { useState } from "react";

import { Group } from "@prisma/client";

type ContextProps = {
  group: Group,
  setGroup: (data: Group) => void,
}

const PageContext = React.createContext<ContextProps | undefined>(undefined);

type Props = {
  group: Group,
  children: React.ReactNode,
}

export const PageProvider = ({ group, children }: Props) => {
  const [intGroup, setIntGroup] = useState(group);

  return (
    <PageContext.Provider value={{
      group: intGroup,
      setGroup: (data: Group) => setIntGroup(data),
    }}>
      {children}
    </PageContext.Provider>
  );
};

export const usePage = () => {
  const context = React.useContext(PageContext);
  if (context === undefined) {
    throw new Error("usePage must be used within a PageProvider.");
  }
  return context;
}