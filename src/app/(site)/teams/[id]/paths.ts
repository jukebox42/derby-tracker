import { Route, Routes } from "#/lib/routes";
import { Permission } from "@prisma/client";

export const paths: Routes = {
  ROOT: {
    label: "Charter",
    path: "",
    permissions: [Permission.TEAM_CHARTER_MANAGE, Permission.TEAM_CHARTER_READ],
  },
  GAMES: {
    label: "Games",
    path: "/games",
    permissions: [Permission.EVENT_GAME_READ, Permission.EVENT_GAME_MANAGE],
  },
}

export const tabsPaths: Route[] = [
  paths.ROOT,
  paths.GAMES,
];