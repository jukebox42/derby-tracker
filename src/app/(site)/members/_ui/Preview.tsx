"use client"
import { Permission } from "@prisma/client";
import { Button } from "@mui/material";

import { ProfilePreviewCard } from "#/ui/common";
import { memberDefinition as md } from "#/lib/data/members";
import { memberSocialDefinition as msd } from "#/lib/data/memberSocial";
import { useSite } from "#/context";

import { usePage } from "../[id]/context";
import { ChangePasswordModal } from "./ChangePasswordModal";

export const Preview = () => {
  const { hasAccess } = useSite([Permission.MEMBER_READ, Permission.MEMBER_MANAGE]);
  const { member } = usePage();

  const aboutList = [
    { label: md.name.label, value: member.name },
    { label: md.pronouns.label, value: md.pronouns.render(member) },
    { label: md.level.label, value: md.level.render(member) },
    { label: md.preferredPosition.label, value: md.preferredPosition.render(member) },
  ];

  const socialList = [
    { label: md.email.label, value: member.email },
    // TODO: this stuff isnt on the member object anymore. get it from the social object. aka make one of those
    { label: msd.slack.label, value: msd.slack.render(member.social) },
    { label: msd.facebook.label, value: msd.facebook.render(member.social) },
  ];

  const adminList = [
    { label: md.updatedAt.label, value: md.updatedAt.render(member) },
    { label: md.createdAt.label, value: md.createdAt.render(member) },
  ];
return (
  <ProfilePreviewCard
    title={`${member.alias} ${md.number.render(member)}`}
    avatarCharacters={member.alias[0]}
    chips={[
      ...(!member.active ? [{ label: "Inactive", color: "error"}]: []),
      ...(member.isOnLoa ? [{ label: "Leave Of Absence", color: "warning"}]: []),
    ] as any}
    lists={[
      { title: "Details", items: aboutList },
      { title: "Social", items: socialList },
      ...(hasAccess ? [{ title: "Admin", items: adminList }]: [])
    ]}
    actions={
      <>
        <Button variant="contained" color="secondary">Edit</Button>
        <ChangePasswordModal />
      </>
    }
  />
  );
}