"use client"
import { Permission } from "@prisma/client";
import { Button } from "@mui/material";

import { ProfilePreviewCard } from "#/ui/common";
import { memberDefinition as md } from "#/lib/data/members";
import { memberSocialDefinition as msd } from "#/lib/data/memberSocial";
import { useSite } from "#/context";
import { PromptButton } from "#/ui/smart";
import { ActionResponseType, memberActions } from "#/app/actions";

import { usePage } from "../[id]/context";

export const Preview = () => {
  const { hasAccess } = useSite([Permission.MEMBER_READ, Permission.MEMBER_MANAGE]);
  const { member, setMember } = usePage();

  const handleLoa = async () => {
    const result = await memberActions.toggleLoA(member.id, !member.isOnLoa);
    if (result.type === ActionResponseType.ERROR) {
      throw new Error(result.error.message);
    }
    setMember({ ...member, isOnLoa: result.data });
  }
  const handleActivate = async () => {
    const result = await memberActions.toggleActive(member.id, !member.active);
    if (result.type === ActionResponseType.ERROR) {
      throw new Error(result.error.message);
    }
    setMember({ ...member, active: !member.active });
  }

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
    actions={[
      <Button variant="contained" color="secondary">Edit</Button>,
      <PromptButton
        promptMessage={
          member.isOnLoa ?
          "You are about to take this player off a Leave of Absence." :
          "You are about to put this player on a Leave of Absence."
        }
        color="warning"
        permissions={[Permission.MEMBER_MANAGE]}
        onClick={handleLoa}
      >
        {member.isOnLoa ? "End LoA" : "Start LoA"}
      </PromptButton>,
      <PromptButton
        promptMessage={
          member.active ?
          "You are about to deactivate this member. They will not be able to log in while deactivated." :
          "You are about to reactivate this member. This will restore their ability to login."
        }
        color={member.active ? "error" : "success"}
        permissions={[Permission.MEMBER_MANAGE]}
        onClick={handleActivate}
      >
        {member.active ? "Deactivate" : "Reactivate"}
      </PromptButton>,
    ]}
  />
  );
}