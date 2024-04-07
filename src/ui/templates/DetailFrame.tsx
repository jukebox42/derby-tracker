"use client"
import React from "react";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { Route } from "#/lib/routes";
import { TabButtonGroup } from "#/ui/smart";

type Props = {
  card: React.ReactNode,
  children: React.ReactNode,
  basePath: string,
  tabPaths: Route[],
  settingsTab?: Route,
  memberId?: string,
}

export const DetailFrame = ({ card, children, basePath, tabPaths, settingsTab, memberId }: Props) => (
  <Grid container spacing={3}>
    <Grid xs={12} lg={4}>
      {card}
    </Grid>
    <Grid xs={12} lg={8}>
      <Stack spacing={3}>
        <TabButtonGroup basePath={basePath} paths={tabPaths} settingsTab={settingsTab} memberId={memberId} />
        {children}
      </Stack>
    </Grid>
  </Grid>
);