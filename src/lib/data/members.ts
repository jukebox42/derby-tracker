import * as Yup from "yup";

import { Definition } from "./types";

import { renderValue } from "#/ui/data";
import { routes } from "../routes";
import { Permission } from "@prisma/client";
import { memberSocialDefinition } from "./memberSocial";
import { memberContactDefinition } from "./memberContact";

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

export const memberDetailPath = (id: string) => `${routes.MEMBERS.path}/${id}`;

export const memberDefinition: Definition = {
  alias: {
    key: "alias",
    label: "Derby Name",
    type: "link",
    render: params => renderValue.string(params.name),
    renderCell: params => renderValue.link(params.alias, memberDetailPath(params.id)),
    validation: () => Yup.string().nullable(),
  },
  name: {
    key: "name",
    label: "Government Name",
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
    validation: () => Yup.string().matches(/\d{1,4}|^$/, "Number is invalid").nullable(),
  },
  level: {
    key: "level",
    label: "Level",
    type: "string",
    map: levels,
    render: params => renderValue.enum(params.level, levels),
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
    validation: () => Yup.boolean(),
  },
  preferredPosition: {
    key: "preferredPosition",
    label: "Position Preference",
    type: "string",
    map: positions,
    render: params => renderValue.enum(params.preferredPosition, positions),
    validation: () => Yup.string().oneOf(Object.keys(positions)).nullable(),
  },
  active: {
    key: "active",
    label: "Is Active",
    type: "boolean",
    render: params => renderValue.boolean(params.active, true),
    validation: () => Yup.boolean(),
    permissions: [Permission.MEMBER_MANAGE],
  },
  updatedAt: {
    key: "updatedAt",
    label: "Updated",
    type: "datetime",
    render: params => renderValue.datetime(params.updatedAt),
    validation: () => Yup.date(),
    permissions: [Permission.MEMBER_MANAGE],
  },
  createdAt: {
    key: "createdAt",
    label: "Created",
    type: "datetime",
    render: params => renderValue.datetime(params.createdAt),
    validation: () => Yup.date(),
    permissions: [Permission.MEMBER_MANAGE],
  },
};

export const validationSchema = Yup.object().shape({
  name: memberDefinition["name"].validation(),
  email: memberDefinition["email"].validation(),
  alias: memberDefinition["alias"].validation(),
  pronouns: memberDefinition["pronouns"].validation(),
  number: memberDefinition["number"].validation(),
  level: memberDefinition["level"].validation(),
  preferredPosition: memberDefinition["preferredPosition"].validation(),
  about: memberDefinition["about"].validation(),
});

export const editValidationSchema = Yup.object().shape({
  name: memberDefinition["name"].validation(),
  email: memberDefinition["email"].validation(),
  alias: memberDefinition["alias"].validation(),
  pronouns: memberDefinition["pronouns"].validation(),
  number: memberDefinition["number"].validation(),
  level: memberDefinition["level"].validation(),
  preferredPosition: memberDefinition["preferredPosition"].validation(),
  about: memberDefinition["about"].validation(),

  personalEmail: memberContactDefinition["personalEmail"].validation(),
  phone: memberContactDefinition["phone"].validation(),
  address: memberContactDefinition["address"].validation(),
  city: memberContactDefinition["city"].validation(),
  state: memberContactDefinition["state"].validation(),
  zip: memberContactDefinition["zip"].validation(),

  slack: memberSocialDefinition["slack"].validation(),
  facebook: memberSocialDefinition["facebook"].validation(),
})