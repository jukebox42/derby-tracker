"use client";
import React from "react";

import { memberActions } from "@/app/actions";
import { ErrorText, Loading, PageError, ProfileBanner, TabButtonGroup } from "@/components";
import { useConnectedEntity } from "@/hooks/useConnectedEntity";
import { memberDefinition as md } from "@/lib/data/members";
import { Member, Prisma } from "@prisma/client";
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

  const paths = filterRoutes(session?.permissions ?? [], tabsPaths);

  return (
    <PageProvider member={member}>
      <ProfileBanner
        title={member.alias}
        chips={[
          ...(!member.active ? [{ label: "Inactive", color: "error"}]: []),
          ...(member.isOnLoa ? [{ label: "Leave Of Absence", color: "warning"}]: []),
        ] as any}
        highlights={[
          { label: "pronouns", value: md.pronouns.render(member) },
          { label: "number", value: md.number.render(member) },
          { label: "preferredPosition", value: md.preferredPosition.render(member) },
        ]}
        onAction={() => null}
        actionDisabled={!member.active}
      />
      <TabButtonGroup basePath={`${routes.MEMBERS.path}/${id}`} paths={paths} />
      {children}
    </PageProvider>
  );
}