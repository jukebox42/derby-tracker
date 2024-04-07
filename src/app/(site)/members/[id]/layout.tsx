"use server";
import React from "react";
import { redirect } from "next/navigation";

import { ActionResponseType, memberActions } from "#/app/actions";
import { routes } from "#/lib/routes";
import { DetailFrame } from "#/ui/templates";

import { paths, tabsPaths } from "./paths";
import { PageProvider } from "./context";
import { Preview } from "../_ui/Preview";

export default async function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode,
  params: { id: string }
}) {
  const result = await memberActions.get( { id });
  if (result.type === ActionResponseType.ERROR) {
    // TODO: Maybe we don't redirect and instead we show an error page?
    redirect(routes.MEMBERS.path);
  }
  const member = result.data;

  return (
    <PageProvider member={member}>
      <DetailFrame
        card={<Preview />}
        basePath={`${routes.MEMBERS.path}/${id}`}
        tabPaths={tabsPaths}
        settingsTab={paths.SETTINGS}
        memberId={id}
      >
        {children}
      </DetailFrame>
    </PageProvider>
  );
}