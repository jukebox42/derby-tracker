import { Route, Routes } from "@/lib/routes";
import { Permission } from "@prisma/client";

export const routes: Routes = {
  ROOT: {
    label: "Profile",
    path: "",
    permissions: [],
  },
  TEAMS: {
    label: "Teams",
    path: "/teams",
    permissions: [Permission.TEAM_READ, Permission.TEAM_MANAGE],
  },
  GROUPS: {
    label: "Groups",
    path: "/groups",
    permissions: [Permission.GROUP_READ, Permission.GROUP_MANAGE],
  },
  MANAGE: {
    label: "Manage",
    path: "/manage",
    permissions: [Permission.MEMBER_MANAGE],
  },
}

export const tabsPaths: Route[] = [
  routes.ROOT,
  routes.TEAMS,
  routes.GROUPS,
  routes.MANAGE,
];