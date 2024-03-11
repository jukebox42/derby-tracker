"use client"
import React from "react";
import { ChipProps, List, ListItem, ListSubheader, Stack } from "@mui/material";

import { ProfilePane, TitlePane } from "../..";

export type PreviewCardProps = {
  title: string,
  lists: {
    title: string,
    items: { label: string, value: React.ReactNode }[],
  }[],
  actions?: React.ReactNode | React.ReactNode[],
}

export type ProfilePreviewCardProps = {
  avatarUrl?: string,
  avatarCharacters?: string,
  chips?: ({ label: string } & Pick<ChipProps, "color">)[],
} & PreviewCardProps;

const InternalPreviewCard = ({ lists, actions }: Omit<PreviewCardProps, "title">) => (
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
  <TitlePane boxSx={{ gap: 0 }} title={title}>
    <InternalPreviewCard lists={lists} actions={actions} />
  </TitlePane>
);

export const ProfilePreviewCard = ({ title, lists, chips, avatarUrl, avatarCharacters, actions }: ProfilePreviewCardProps) => (
  <ProfilePane boxSx={{ gap: 0 }} title={title} avatarUrl={avatarUrl} avatarCharacters={avatarCharacters} chips={chips}>
    <InternalPreviewCard lists={lists} actions={actions} />
  </ProfilePane>
);