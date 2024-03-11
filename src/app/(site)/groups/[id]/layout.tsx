"use client";
import React from "react";

import { groupActions } from "@/app/actions";
import { ErrorText, Loading, PageError, PreviewCard, TabButtonGroup } from "@/components";
import { useConnectedEntity } from "@/hooks/useConnectedEntity";
import { Group, Permission, Prisma } from "@prisma/client";
import { PageProvider } from "./context";
import { groupDefinition as gd } from "@/lib/data/group";
import { useStore } from "@/hooks/useStore";
import { Button, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { filterRoutes, routes } from "@/lib/routes";
import { tabsPaths } from "./paths";

export default function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode,
  params: { id: string }
}) {
  const session = useStore(state => state.session);
  const canManage = session?.permissions.find(p => p === Permission.GROUP_MANAGE);
  const connectedEntity = useConnectedEntity<Group, Prisma.GroupWhereInput>(groupActions.get, { id });
  const group = connectedEntity.entity;

  if (connectedEntity.isLoading) {
    return (
      <Loading />
    );
  }

  if (!group) {
    return (
      <PageError>
        <ErrorText text={connectedEntity.error} />
      </PageError>
    );
  }

  const aboutList = [
    { label: gd.description.label, value: gd.description.render(group) },
    ...(canManage ? [
      { label: gd.updatedAt.label, value: gd.updatedAt.render(group) },
      { label: gd.createdAt.label, value: gd.createdAt.render(group) },
    ] : [])
  ];

  // TODO: Need to figure out how to handle GROUP_ADMIN
  const paths = filterRoutes(session?.permissions ?? [], tabsPaths);

  return (
    <PageProvider group={group}>
      <Grid container spacing={3}>
        <Grid xs={12} lg={4}>
          <PreviewCard
            title={group.name}
            lists={[
              { title: "Details", items: aboutList },
            ]}
            actions={
              <Button variant="contained" color="secondary">Edit</Button>
            }
          />
        </Grid>
        <Grid xs={12} lg={8}>
          <Stack spacing={3}>
            <TabButtonGroup basePath={`${routes.GROUPS.path}/${id}`} paths={paths} />
            {children}
          </Stack>
        </Grid>
      </Grid>
    </PageProvider>
  );
}