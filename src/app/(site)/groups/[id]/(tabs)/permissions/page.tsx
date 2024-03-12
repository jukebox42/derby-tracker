"use client";
import { Divider, List, ListItem, Typography } from "@mui/material";

import { permissions } from "#/lib/data/group";
import { Card } from "#/ui/common";

import { usePage } from "../../context";

export default function Page() {
  const { group } = usePage();
  return (
    <Card>
      <Typography component="h2" variant="h4">Permissions</Typography>
      <List>
        {group.permissions.map(permission => (
          <>
            <ListItem>{permissions[permission]}</ListItem>
            <Divider component="li" />
          </>
        ))}
      </List>
    </Card>
  );
}