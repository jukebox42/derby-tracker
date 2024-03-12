import * as Yup from "yup";

import { Definition } from "./types";

import { renderValue } from "#/components";
import { routes } from "../routes";

export const positions: {[key: string]: string} = {
  BLOCKER: "Blocker",
  PIVOT: "Pivot",
  JAMMER: "Jammer",
  SKATING_OFFICIAL: "Skating Official",
  NON_SKATING_OFFICIAL: "Non-Skating Official",
  COACH: "Coach"
}

export const levels: {[key: string]: string} = {
  NON_PLAYER: "Non-Player",
  ROOKIE: "Rookie (Level 1)",
  CONTACT: "Contact (Level 2)",
  GAME: "Game (Level 3)",
}

export const memberDefinition: Definition = {
  alias: {
    key: "alias",
    label: "Name",
    type: "link",
    render: params => renderValue.link(params.alias, `${routes.MEMBERS.path}/${params.id}`),
    renderCell: params => renderValue.link(params.value, `${routes.MEMBERS.path}/${params.id}`),
    validation: () => Yup.string().nullable(),
  },
  name: {
    key: "name",
    label: "Real Name",
    type: "string",
    render: params => renderValue.string(params.name),
    validation: () => Yup.string().required("Real name is required."),
  },
  email: {
    key: "email",
    label: "Email",
    type: "string",
    render: params => renderValue.string(params.email),
    validation: () => Yup.string().required("Email address is required.").email("Email Address is invalid."),
  },
  number: {
    key: "number",
    label: "Number",
    type: "string",
    render: params => renderValue.string(params.number, "#"),
    renderCell: params => renderValue.string(params.value, "#"),
    validation: () => Yup.string().matches(/\d{1,4}|^$/, "Number is invalid").nullable(),
  },
  level: {
    key: "level",
    label: "Level",
    type: "string",
    map: levels,
    render: params => renderValue.enum(params.level, levels),
    renderCell: params => renderValue.enum(params.value, levels),
    validation: () => Yup.string().oneOf(Object.keys(levels)).required("Level is required")
  },
  pronouns: {
    key: "pronouns",
    label: "Pronouns",
    type: "string",
    render: params => renderValue.string(params.pronouns),
    validation: () => Yup.string().nullable(),
  },
  about: {
    key: "about",
    label: "About",
    type: "string",
    render: params => renderValue.string(params.about ?? "What is there to say really?"),
    validation: () => Yup.string().nullable(),
  },
  isOnLoa: {
    key: "isOnLoa",
    label: "Is On Loa",
    type: "boolean",
    render: params => renderValue.boolean(params.isOnLoa, true),
    renderCell: params => renderValue.boolean(params.value, true),
    validation: () => Yup.boolean(),
  },
  preferredPosition: {
    key: "preferredPosition",
    label: "Position Preference",
    type: "string",
    map: positions,
    render: params => renderValue.enum(params.preferredPosition, positions),
    renderCell: params => renderValue.enum(params.value, positions),
    validation: () => Yup.string().oneOf(Object.keys(positions)).nullable(),
  },
  active: {
    key: "active",
    label: "Is Active",
    type: "boolean",
    render: params => renderValue.boolean(params.active, true),
    renderCell: params => renderValue.boolean(params.value, true),
    validation: () => Yup.boolean(),
  },
  slackUsername: {
    key: "slackUsername",
    label: "Slack",
    type: "string",
    render: params => renderValue.link(params.slackUsername, `http://slack.com/@${params.slackUsername}`, true),
    renderCell: params => renderValue.link(params.value, `http://slack.com/@${params.value}`, true),
    validation: () => Yup.string().nullable(),
  },
  facebookLink: {
    key: "facebookLink",
    label: "Facebook",
    type: "link",
    render: params => renderValue.link(params.facebookLink, params.facebookLink, true),
    renderCell: params => renderValue.link(params.value, params.value, true),
    validation: () => Yup.string().nullable(),
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
};

export const validationSchema = Yup.object().shape({
  name: memberDefinition["name"].validation(),
  email: memberDefinition["email"].validation(),
  alias: memberDefinition["alias"].validation(),
  number: memberDefinition["number"].validation(),
  level: memberDefinition["level"].validation(),
  preferredPosition: memberDefinition["preferredPosition"].validation(),
});