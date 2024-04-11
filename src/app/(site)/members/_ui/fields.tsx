import { memberContactDefinition as mcd } from "#/lib/data/memberContact";
import { memberSocialDefinition as msd } from "#/lib/data/memberSocial";
import { levels, memberDefinition as md, positions } from "#/lib/data/members";

import { states } from "#/lib/states";
import { FieldGridField } from "#/ui/form";
import { InputAdornment } from "@mui/material";
import { Level, Member, MemberContact, MemberSocial } from "@prisma/client";

export type MemberFields = Omit<Member, "memberId" | "isOnLoa" | "active" | "updatedAt" | "createdAt">;
export type MemberSocialFields = Omit<MemberSocial, "memberId">;
export type MemberContactFields = Omit<MemberContact, "memberId">;

export const memberFields = (member?: MemberFields, selfEdit = false): FieldGridField[] => [
  {
    variant: "TextField",
    wide: true,
    props: {
      name: md.name.key,
      label: md.name.label,
      defaultValue: member?.name,
      required: true,
    },
  },
  {
    variant: "TextField",
    wide: true,
    props: {
      name: md.email.key,
      label: md.email.label,
      defaultValue: member?.email,
      type: "email",
      required: true,
      disabled: selfEdit,
    },
  },
  {
    variant: "TextField",
    wide: true,
    props: {
      name: md.pronouns.key,
      label: md.pronouns.label,
      defaultValue: member?.pronouns,
    },
  },
  {
    variant: "TextField",
    props: {
      name: md.alias.key,
      label: md.alias.label,
      defaultValue: member?.alias,
      required: true,
    },
  },
  {
    variant: "TextField",
    props: {
      name: md.number.key,
      label: md.number.label,
      defaultValue: member?.number,
      InputProps: {
        startAdornment: <InputAdornment position="start">#</InputAdornment>,
      }
    },
  },
  {
    variant: "TextField",
    options: levels,
    props: {
      name: md.level.key,
      label: md.level.label,
      defaultValue: member?.level ?? Level.ROOKIE,
      required: true,
    },
  },
  {
    variant: "TextField",
    options: positions,
    props: {
      name: md.preferredPosition.key,
      label: md.preferredPosition.label,
      defaultValue: member?.preferredPosition,
    },
  },
  {
    variant: "Rte",
    wide: true,
    props: {
      name: md.about.key,
      label: md.about.label,
      defaultValue: member?.about ?? undefined,
    },
  },
];

export const socialFields = (social: MemberSocialFields): FieldGridField[] => [
  {
    variant: "TextField",
    props: {
      name: msd.slack.key,
      label: msd.slack.label,
      defaultValue: social.slack,
      InputProps: {
        startAdornment: <InputAdornment position="start">@</InputAdornment>,
      }
    },
  },
  {
    variant: "TextField",
    props: {
      name: msd.facebook.key,
      label: msd.facebook.label,
      defaultValue: social.facebook,
      InputProps: {
        startAdornment: <InputAdornment position="start">facebook.com/user/</InputAdornment>,
      }
    },
  },
];

export const contactFields = (contact: MemberContactFields): FieldGridField[] => [
  {
    variant: "TextField",
    props: { 
      name: mcd.personalEmail.key,
      label: mcd.personalEmail.label,
      defaultValue: contact.personalEmail,
      type: "email",
    },
  },
  {
    variant: "TextField",
    props: {
      name: mcd.phone.key,
      label: mcd.phone.label,
      defaultValue: contact.phone,
      type: "phone"
    },
  },
  {
    variant: "TextField",
    props: {
      name: mcd.address.key,
      label: mcd.address.label,
      defaultValue: contact.address,
    },
  },
  {
    variant: "TextField",
    props: {
      name: mcd.city.key,
      label: mcd.city.label,
      defaultValue: contact.city,
    },
  },
  {
    variant: "TextField",
    options: states,
    props: {
      name: mcd.state.key,
      label: mcd.state.label,
      defaultValue: contact.state,
    },
  },
  {
    variant: "TextField",
    props: {
      name: mcd.zip.key,
      label: mcd.zip.label,
      defaultValue: contact.zip,
    },
  }
];