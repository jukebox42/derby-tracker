import { Stack } from "@mui/material"

import { useTab } from "#/hooks/useTab";
import { Route } from "#/lib/routes";

import { TabButton } from "./TabButton"

export type TabButtonGroupProps = {
  basePath: string,
  paths: Route[],
}

export const TabButtonGroup = ({ paths, basePath }: TabButtonGroupProps) => {
  const [tab, setTab] = useTab(basePath);
  return (
    <Stack spacing={1} direction="row">
      {paths.map(t => (
        <TabButton key={t.label} tabKey={t.path} activeKey={tab} onClick={() => setTab(t.path)}>
          {t.label}
        </TabButton>
      ))}
    </Stack>
  );
}