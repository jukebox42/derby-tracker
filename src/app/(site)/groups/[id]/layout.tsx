"use client";
import React from "react";

import { groupActions } from "@/app/actions";
import { ErrorText, Loading, PageError } from "@/components";
import { useConnectedEntity } from "@/hooks/useConnectedEntity";
import { Group, Prisma } from "@prisma/client";
import { PageProvider } from "./context";

export default function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode,
  params: { id: string }
}) {
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

  return (
    <PageProvider group={group}>
      {children}
    </PageProvider>
  );
}