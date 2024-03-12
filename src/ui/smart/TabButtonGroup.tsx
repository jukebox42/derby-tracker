"use client"
import { Stack } from "@mui/material"

import { useSite } from "#/context";
import { useTab } from "#/hooks/useTab";
import { Route, filterRoutes } from "#/lib/routes";

import { TabButton } from "../internal/TabButton";

export type TabButtonGroupProps = {
  basePath: string,
  paths: Route[],
}

export const TabButtonGroup = ({ paths, basePath }: TabButtonGroupProps) => {
  const { session } = useSite();
  const [tab, setTab] = useTab(basePath);

  const filtered = filterRoutes(session.permissions, paths);

  return (
    <Stack spacing={1} direction="row">
      {filtered.map(t => (
        <TabButton key={t.label} tabKey={t.path} activeKey={tab} onClick={() => setTab(t.path)}>
          {t.label}
        </TabButton>
      ))}
    </Stack>
  );
}