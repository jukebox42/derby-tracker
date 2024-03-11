import { Route, Routes } from "@/lib/routes";
import { Permission } from "@prisma/client";

export const paths: Routes = {
  ROOT: {
    label: "Members",
    path: "",
    permissions: [Permission.MEMBER_READ, Permission.MEMBER_MANAGE],
  },
  PERMISSIONS: {
    label: "Permissions",
    path: "/permissions",
    permissions: [],
  },
  Edit: {
    label: "Edit",
    path: "/edit",
    permissions: [Permission.GROUP_MANAGE],
  },
}

export const tabsPaths: Route[] = [
  paths.ROOT,
  paths.PERMISSIONS,
];