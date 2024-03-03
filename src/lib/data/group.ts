import * as Yup from "yup";

import { Definition } from "./types";
import { renderValue } from "@/components";
import { routes } from "../routes";

export const permissions: {[key: string]: string} = {
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
}

export const groupDefinition: Definition = {
  name: {
    key: "name",
    label: "Name",
    type: "string",
    render: params => renderValue.link(params.name, `${routes.GROUPS.path}/${params.id}`, false),
    renderCell: params => renderValue.link(params.value, `${routes.GROUPS.path}/${params.id}`, false),
    validation: () => Yup.string().required("Group name required."),
  },
  description: {
    key: "description",
    label: "Description",
    type: "string",
    render: params => renderValue.string(params.description),
    renderCell: params => renderValue.string(params.value),
    validation: () => Yup.string().nullable(),
  },
  permissions: {
    key: "permissions",
    label: "Permissions",
    type: "array",
    render: params => renderValue.array(params.permissions, permissions),
    renderCell: params => renderValue.array(params.value, permissions),
    validation: () => Yup.array().of(Yup.string().oneOf(Object.keys(permissions))).min(1, "Permissions are required."),
  },
  updatedAt: {
    key: "updatedAt",
    label: "Updated",
    type: "datetime",
    render: params => renderValue.datetime(params.updatedAt),
    renderCell: params => renderValue.datetime(params.value),
    validation: () => Yup.date(),
  },
  createdAt: {
    key: "createdAt",
    label: "Created",
    type: "datetime",
    render: params => renderValue.datetime(params.createdAt),
    renderCell: params => renderValue.datetime(params.value),
    validation: () => Yup.date(),
  },
}

export const validationSchema = Yup.object().shape({
  name: groupDefinition["name"].validation(),
  description: groupDefinition["description"].validation(),
  permissions: groupDefinition["permissions"].validation(),
});