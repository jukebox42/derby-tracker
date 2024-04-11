"use server"
import React from "react";

import { ActionResponseType, teamActions } from "#/app/actions";
import { routes } from "#/lib/routes";
import { tabsPaths } from "./paths";
import { PageProvider } from "./context";
import { redirect } from "next/navigation";
import { Preview } from "../_ui/Preview";
import { DetailFrame } from "#/ui/templates";

export default async function Layout({
  children,
  params: { id },
}: {
  children: React.ReactNode,
  params: { id: string }
}) {
  const result = await teamActions.get( { id });
  if (result.type === ActionResponseType.ERROR) {
    // TODO: Maybe we don't redirect and instead we show an error page?
    redirect(routes.TEAMS.path);
  }
  const team = result.data;

  return (
    <PageProvider team={team}>
      <DetailFrame
        card={<Preview />}
        basePath={`${routes.TEAMS.path}/${id}`}
        tabPaths={tabsPaths} 
      >
        {children}
      </DetailFrame>
    </PageProvider>
  );
}