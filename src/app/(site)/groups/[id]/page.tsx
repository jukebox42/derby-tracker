"use client";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Divider, List, ListItem, Stack, Typography } from "@mui/material";

import { Permission } from "@prisma/client";
import { groupDefinition as gd, permissions } from "@/lib/data/group";

import { Pane, PreviewCard } from "@/components";
import { useStore } from "@/hooks/useStore";
import { usePage } from "./context";


export default function Page() {
  const { group } = usePage();
  const session = useStore(state => state.session);
  const canManage = session?.permissions.find(p => p === Permission.GROUP_MANAGE);

  const aboutList = [
    { label: gd.name.label, value: group.name },
    { label: gd.description.label, value: gd.description.render(group) },
    ...(canManage ? [
      { label: gd.updatedAt.label, value: gd.updatedAt.render(group) },
      { label: gd.createdAt.label, value: gd.createdAt.render(group) },
    ] : [])
  ];

  return (
    <>
      <Typography variant="h4">{group.name}</Typography>
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
            <Pane>
              <Typography variant="h6">Permissions</Typography>
              <List>
                {group.permissions.map(permission => (
                  <>
                    <ListItem>{permissions[permission]}</ListItem>
                    <Divider component="li" />
                  </>
                ))}
              </List>
            </Pane>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}