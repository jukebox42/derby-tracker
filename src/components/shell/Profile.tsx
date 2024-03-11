"use client";
import React from "react";
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { useStore } from "@/hooks/useStore";

type ProfileProps = {
  name: string;
  number: string | null;
}

export const Profile = ({ name, number }: ProfileProps) => {
  const router = useRouter();
  const { member } = useStore(state => ({
    member: state.activeMember,
  }));

  if (!member) {
    return <></>;
  }

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
        <ListItemButton onClick={() => router.push(`${routes.MEMBERS.path}/${member.id}`)}>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText
            primary={
              <>
                {name}
                {number && <Typography variant="subtitle2">#{number}</Typography>}
              </>
            }
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
}