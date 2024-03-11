"use client";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Stack } from "@mui/material";

import { hasPermission, memberActions } from "@/app/actions";
import { ErrorText, Loading, PageError, ProfilePreviewCard, PromptButton, TabButtonGroup } from "@/components";
import { useConnectedEntity } from "@/hooks/useConnectedEntity";
import { memberDefinition as md } from "@/lib/data/members";
import { Member, Permission, Prisma } from "@prisma/client";
import { PageProvider } from "./context";
import { filterRoutes, routes } from "@/lib/routes";
import { tabsPaths } from "./paths";
import { useStore } from "@/hooks/useStore";

export default function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode,
  params: { id: string }
}) {
  const session = useStore(state => state.session);
  const canManage = hasPermission([Permission.MEMBER_MANAGE], session);
  const connectedEntity = useConnectedEntity<Member, Prisma.MemberWhereInput>(memberActions.get, { id });
  const member = connectedEntity.entity;

  if (connectedEntity.isLoading) {
    return (
      <Loading />
    );
  }

  if (!member) {
    return (
      <PageError>
        <ErrorText text={connectedEntity.error} />
      </PageError>
    );
  }

  const aboutList = [
    { label: md.name.label, value: member.name },
    { label: md.pronouns.label, value: md.pronouns.render(member) },
    { label: md.level.label, value: md.level.render(member) },
    { label: md.preferredPosition.label, value: md.preferredPosition.render(member) },
  ];

  const socialList = [
    ...(canManage ? [{ label: md.email.label, value: member.email }] : []),
    { label: md.slackUsername.label, value: md.slackUsername.render(member) },
    { label: md.facebookLink.label, value: md.facebookLink.render(member) },
  ];

  const adminList = [
    { label: md.updatedAt.label, value: md.updatedAt.render(member) },
    { label: md.createdAt.label, value: md.createdAt.render(member) },
  ];

  const paths = filterRoutes(session?.permissions ?? [], tabsPaths);

  const handleLoa = () => {
    memberActions.toggleLoA(id, !member.isOnLoa);
    connectedEntity.onRefresh();
  }
  const handleActivate = () => {
    memberActions.toggleActive(id, !member.active);
    connectedEntity.onRefresh();
  }

  return (
    <PageProvider member={member}>
      <Grid container spacing={3}>
        <Grid xs={12} lg={4}>
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
              ...(canManage ? [{ title: "Admin", items: adminList }]: [])
            ]}
            actions={[
              <Button variant="contained" color="secondary">Edit</Button>,
              <PromptButton
                label={member.isOnLoa ? "End LoA" : "Start LoA"}
                promptMessage={
                  member.isOnLoa ?
                  "You are about to take this player off a Leave of Absence." :
                  "You are about to put this player on a Leave of Absence."
                }
                color="warning"
                permissions={[Permission.MEMBER_MANAGE]}
                onClick={handleLoa}
              />,
              <PromptButton
                label={member.active ? "Deactivate" : "Reactivate"}
                promptMessage={
                  member.active ?
                  "You are about to deactivate this member. They will not be able to log in while deactivated." :
                  "You are about to reactivate this member. This will restore their ability to login."
                }
                color={member.active ? "error" : "success"}
                permissions={[Permission.MEMBER_MANAGE]}
                onClick={handleActivate}
              />,
            ]}
          />
        </Grid>
        <Grid xs={12} lg={8}>
          <Stack spacing={3}>
            <TabButtonGroup basePath={`${routes.MEMBERS.path}/${id}`} paths={paths} />
            {children}
          </Stack>
        </Grid>
      </Grid>
    </PageProvider>
  );
}