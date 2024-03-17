"use client"
import React from "react";
import { Avatar, AvatarProps, Button, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";

import { ErrorText } from "#/ui/form";

import { GenericDataDisplay } from "../types";
import { ListItemDef } from "#/lib/data/utils";
import { Loading } from "#/ui/common";
import { GridValidRowModel } from "@mui/x-data-grid";

type Props<R extends GridValidRowModel> = {
  avatarProps?: (row: R) => AvatarProps,
  title: (row: R) => React.ReactNode,
  secondaryItems: ListItemDef<R>[],
  description?: ListItemDef<R>,
  onClick?: (row: R) => void,
} & GenericDataDisplay<R>;

export const DataList = <R extends GridValidRowModel,>({ rows, isLoading, error, refresh, title, description, secondaryItems, rowAction, avatarProps, onClick }: Props<R>) => {
  if (isLoading) {
    return <Loading simple />
  }

  if (error) {
    return (
      <ErrorText
        text={error}
        action={<Button onClick={refresh}>Retry</Button>}
      />
    )
  }

  const listItem = (row: R) => (
    <>
      {avatarProps && <ListItemAvatar><Avatar {...avatarProps(row)} /></ListItemAvatar>}
      <ListItemText
        primary={title(row)}
        secondary={
          <>
            {description && (
              <Typography variant="body1" mb={1}>
                {description.render(row)}
              </Typography>
            )}
            <Stack spacing={2} component="span" direction="row" divider={<Divider orientation="vertical" flexItem />}>
              {secondaryItems.map(item => {
                return <Typography key={item.field} variant="body2">{item.render(row)}</Typography>
              })}
            </Stack>
          </>
        }
      />
    </>
  );

  return (
    <List sx={{ width: "100%" }}>
      {rows.map(row => (
        <React.Fragment key={row.id}>
          {!!onClick ? (
            <ListItemButton key={row.id} onClick={() => onClick(row)}>
              {listItem(row)}
            </ListItemButton>
          ) : (
            <ListItem key={row.id} secondaryAction={rowAction?.(row as any, refresh)}>
              {listItem(row)}
            </ListItem>
          )}
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}