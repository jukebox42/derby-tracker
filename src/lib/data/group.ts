import * as Yup from "yup";

import { Definition } from "./types";
import { renderValue } from "#/ui/data";
import { routes } from "../routes";
import { Permission } from "@prisma/client";

export const permissions: {[key: string]: string} = {
  ANNOUNCEMENTS_READ: "Announcements read",
  ANNOUNCEMENTS_MANAGE: "Announcements manage",
  ATTENDANCE_READ: "Attendance read",
  ATTENDANCE_MANAGE: "Attendance manage",
  ASSESSMENT_READ: "Assessment read",
  ASSESSMENT_MANAGE: "Assessment manage",
  EVENT_READ: "Event read",
  EVENT_MANAGE: "Event manage",
  GROUP_READ: "Group read",
  GROUP_MANAGE: "Group manage",
  MEMBER_READ: "Member read",
  MEMBER_MANAGE: "Member manage",
  SETTING_READ: "Settings read",
  SETTING_MANAGE: "Settings manage",
  STATS_READ: "Stats read",
  STATS_MANAGE: "Stats manage",
  TEAM_READ: "Team read",
  TEAM_MANAGE: "Team manage",

  // non page permissions
  GROUP_ADMIN: "Group admin",
  EVENT_GAME_READ: "Event game read",
  EVENT_GAME_MANAGE: "Event game management",
  EVENT_PRACTICE_READ: "Event practice read",
  EVENT_PRACTICE_MANAGE: "Event practice manage",
  EVENT_ACTIVITY_READ: "Event activity read",
  EVENT_ACTIVITY_MANAGE: "Event activity manage",
  EVENT_DRAFT_MANAGE: "Event draft manage",
  TEAM_CHARTER_READ: "Team charter read",
  TEAM_CHARTER_MANAGE: "Team charter manage",
  GAME_ROSTER_VIEW: "Game roster view",
  GAME_ROSTER_MANAGE: "Game roster manage",
}

export const groupDetailPath = (id: string) => `${routes.GROUPS.path}/${id}`;

export const groupDefinition: Definition = {
  name: {
    key: "name",
    label: "Name",
    type: "string",
    render: params => params.name,
    renderCell: params => renderValue.link(params.name, groupDetailPath(params.id), false),
    validation: () => Yup.string().required("Group name required."),
  },
  description: {
    key: "description",
    label: "Description",
    type: "string",
    render: params => renderValue.string(params.description),
    validation: () => Yup.string().nullable(),
  },
  permissions: {
    key: "permissions",
    label: "Permissions",
    type: "array",
    render: params => renderValue.array(params.permissions, permissions),
    validation: () => Yup.array().of(Yup.string().oneOf(Object.keys(permissions))).min(1, "Permissions are required."),
  },
  updatedAt: {
    key: "updatedAt",
    label: "Updated",
    type: "datetime",
    render: params => renderValue.datetime(params.updatedAt),
    validation: () => Yup.date(),
    permissions: [Permission.GROUP_MANAGE],
  },
  createdAt: {
    key: "createdAt",
    label: "Created",
    type: "datetime",
    render: params => renderValue.datetime(params.createdAt),
    validation: () => Yup.date(),
    permissions: [Permission.GROUP_MANAGE],
  },
}

export const validationSchema = Yup.object().shape({
  name: groupDefinition["name"].validation(),
  description: groupDefinition["description"].validation(),
  permissions: groupDefinition["permissions"].validation(),
});