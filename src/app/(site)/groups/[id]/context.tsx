"use client";

import React from "react";

import { Group } from "@prisma/client";

type ContextProps = {
  group: Group,
}

const PageContext = React.createContext<ContextProps | undefined>(undefined);

type Props = {
  group: Group,
  children: React.ReactNode,
}

export const PageProvider = ({ group, children }: Props) => (
  <PageContext.Provider value={ { group } }>
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