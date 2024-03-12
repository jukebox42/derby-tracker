"use client";
import { StateCreator } from "zustand";

import { Member, Session, } from "@prisma/client"
import { memberActions, authActions, ActionResponseType } from "#/app/actions";


export type AppStore = {
  session?: Session,
  activeMember?: Member,
  checkAuth: () => Promise<boolean>,
};

export const createAppStore: StateCreator<AppStore, any, [], AppStore> = (set, get) => ({
  activeMember: undefined,
  session: undefined,

  checkAuth: async () => {
    const session = await authActions.check();
    if (session.type === ActionResponseType.ERROR) {
      return false;
    }

    const member = await memberActions.get({ id: session.data.memberId });
    if (member.type === ActionResponseType.ERROR) {
      return false;
    }

    set({ session: session.data, activeMember: member.data });

    return !!session.data;
  },
})