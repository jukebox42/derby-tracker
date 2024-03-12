"use client"
import React from "react";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { Route } from "#/lib/routes";
import { TabButtonGroup } from "#/ui/smart";

export const DetailFrame = (
  { card, children, basePath, tabPaths }: 
  { card: React.ReactNode, children: React.ReactNode, basePath: string, tabPaths: Route[] }
) => (
  <Grid container spacing={3}>
    <Grid xs={12} lg={4}>
      {card}
    </Grid>
    <Grid xs={12} lg={8}>
      <Stack spacing={3}>
        <TabButtonGroup basePath={basePath} paths={tabPaths} />
        {children}
      </Stack>
    </Grid>
  </Grid>
);