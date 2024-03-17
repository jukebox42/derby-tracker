"use client"
import React from "react";
import { List, ListItem, ListSubheader, Stack } from "@mui/material";

import { TitleCard } from ".";

export type PreviewCardProps = {
  title: string,
  lists: {
    title: string,
    items: { label: string, value: React.ReactNode }[],
  }[],
  actions?: React.ReactNode | React.ReactNode[],
}

export const InternalPreviewCard = ({ lists, actions }: Omit<PreviewCardProps, "title">) => (
  <>
    {lists.map(list => (
      <List key={list.title} subheader={<ListSubheader disableGutters>{list.title}</ListSubheader>} dense>
        {list.items.map(item => (
          <ListItem key={item.label} disableGutters>
            {item.label}: {item.value}
          </ListItem>
        ))}
      </List>
    ))}
    {actions && (
      <Stack
        direction="row"
        gap={1}
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        {actions}
      </Stack>
    )}
  </>
);

// TODO: Need to figure out how to use a ProfilePane for Members.

export const PreviewCard = ({ title, lists, actions }: PreviewCardProps) => (
  <TitleCard boxSx={{ gap: 0 }} title={title}>
    <InternalPreviewCard lists={lists} actions={actions} />
  </TitleCard>
);