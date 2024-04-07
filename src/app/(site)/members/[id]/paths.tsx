import { Route, Routes } from "#/lib/routes";
import { Permission } from "@prisma/client";

export const paths: Routes = {
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
  CONTACT: {
    label: "Contact",
    path: "/contact",
    permissions: [Permission.MEMBER_MANAGE],
  },
  SETTINGS: {
    label: "SETTINGS",
    path: "/settings",
    permissions: [], // TODO: only show if self
  }
}

export const tabsPaths: Route[] = [
  paths.ROOT,
  paths.TEAMS,
  paths.GROUPS,
  paths.CONTACT,
];