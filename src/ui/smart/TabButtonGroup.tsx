"use client"
import { Box, Stack } from "@mui/material"

import { useSite } from "#/context";
import { useTab } from "#/hooks/useTab";
import { Route, filterRoutes } from "#/lib/routes";

import { TabButton } from "../internal/TabButton";

export type TabButtonGroupProps = {
  basePath: string,
  paths: Route[],
  settingsTab?: Route,
  memberId?: string,
}

export const TabButtonGroup = ({ paths, basePath, settingsTab, memberId }: TabButtonGroupProps) => {
  const { session } = useSite();
  const [tab, setTab] = useTab(basePath);

  const filtered = filterRoutes(session.permissions, paths);

  const memberCheck = !memberId ? true : session.memberId === memberId;

  return (
    <Stack spacing={1} direction="row">
      {filtered.map(t => (
        <TabButton key={t.label} tabKey={t.path} activeKey={tab} onClick={() => setTab(t.path)}>
          {t.label}
        </TabButton>
      ))}
      <Box sx={{ display: "flex", flexGrow: 1 }} />
      {(settingsTab && memberCheck) && (
        <TabButton key={settingsTab.label} tabKey={settingsTab.path} activeKey={tab} onClick={() => setTab(settingsTab.path)}>
          {settingsTab.label}
        </TabButton>
      )}
    </Stack>
  );
}