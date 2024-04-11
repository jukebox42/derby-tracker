"use client";

import React, { useState } from "react";

import { Team } from "@prisma/client";

type ContextProps = {
  team: Team,
  setTeam: (data: Team) => void,
}

const PageContext = React.createContext<ContextProps | undefined>(undefined);

type Props = {
  team: Team,
  children: React.ReactNode,
}

export const PageProvider = ({ team, children }: Props) => {
  const [intTeam, setIntTeam] = useState(team);

  return (
    <PageContext.Provider value={{
      team: intTeam,
      setTeam: (data: Team) => setIntTeam(data),
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