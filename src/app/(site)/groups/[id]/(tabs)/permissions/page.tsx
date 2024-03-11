"use client";
import { Divider, List, ListItem, Typography } from "@mui/material";

import { permissions } from "@/lib/data/group";

import { Pane } from "@/components";
import { usePage } from "../../context";

export default function Page() {
  const { group } = usePage();
  return (
    <Pane>
      <Typography component="h2" variant="h4">Permissions</Typography>
      <List>
        {group.permissions.map(permission => (
          <>
            <ListItem>{permissions[permission]}</ListItem>
            <Divider component="li" />
          </>
        ))}
      </List>
    </Pane>
  );
}