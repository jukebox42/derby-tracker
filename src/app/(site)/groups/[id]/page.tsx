"use client";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { Permission } from "@prisma/client";
import { groupDefinition as gd } from "@/lib/data/group";

import { Pane, PreviewCard, TitlePane } from "@/components";
import { useStore } from "@/hooks/useStore";
import { usePage } from "./context";
import { Stack } from "@mui/material";

export default function Page() {
  const { group } = usePage();
  const session = useStore(state => state.session);
  const canManage = session?.permissions.find(p => p === Permission.MEMBER_MANAGE);

  const aboutList = [
    { label: gd.name.label, value: group.name },
    { label: gd.description.label, value: gd.description.render(group) },
    { label: gd.updatedAt.label, value: gd.updatedAt.render(group) },
    { label: gd.createdAt.label, value: gd.createdAt.render(group) },
  ];

  return (
    <Grid container spacing={3}>
      <Grid xs={12} lg={4}>
        <PreviewCard
          title="Details"
          lists={[
            { title: "About", items: aboutList },
          ]}
        />
      </Grid>
      <Grid xs={12} lg={8}>
        <Stack spacing={3}>
          <TitlePane title="About">
            {gd.name.render(group)}
          </TitlePane>
          <Pane>
            <pre>{JSON.stringify(group, null, 2)}</pre>
          </Pane>
        </Stack>
      </Grid>
    </Grid>
  );
}