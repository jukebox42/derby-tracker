"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import { routes } from "#/lib/routes";

export const Profile = ({ name, memberId }: { name: string, memberId: string }) => {
  const router = useRouter();

  return (
    <List>
      <ListItem
        secondaryAction={
          <IconButton edge="end" aria-label="logout" onClick={() => router.push(routes.LOGOUT.path)}>
            <LogoutIcon />
          </IconButton>
        }
        disablePadding
      >
        <ListItemButton onClick={() => router.push(`${routes.MEMBERS.path}/${memberId}`)}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary={name} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}