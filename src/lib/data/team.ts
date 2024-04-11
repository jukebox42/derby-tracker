import * as Yup from "yup";

import { Definition } from "./types";
import { renderValue } from "#/ui/data";
import { routes } from "../routes";
import { Permission } from "@prisma/client";

export const teamLevels: {[key: string]: string} = {
  A: "A",
  B: "B",
  C: "C",
  HOME: "Home",
}

export const teamDetailPath = (id: string) => `${routes.TEAMS.path}/${id}`;

export const teamDefinition: Definition = {
  name: {
    key: "name",
    label: "Name",
    type: "string",
    render: params => params.name,
    renderCell: params => renderValue.link(params.name, teamDetailPath(params.id), false),
    validation: () => Yup.string().required("Team name required."),
  },
  description: {
    key: "description",
    label: "Description",
    type: "string",
    render: params => renderValue.string(params.description),
    validation: () => Yup.string().nullable(),
  },
  level: {
    key: "level",
    label: "Level",
    type: "string",
    map: teamLevels,
    render: params => renderValue.enum(params.level, teamLevels),
    validation: () => Yup.string().oneOf(Object.keys(teamLevels)).required("Team level is required")
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
  name: teamDefinition["name"].validation(),
  description: teamDefinition["description"].validation(),
  level: teamDefinition["level"].validation(),
});