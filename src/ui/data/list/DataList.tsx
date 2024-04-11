"use client"
import React from "react";
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";

import { ErrorText } from "#/ui/form";

import { DataDisplayRow, ListDataDisplay } from "../types";
import { Loading } from "#/ui/common";

export const DataList = <R extends DataDisplayRow,>({ rows, isLoading, error, refresh, title, description, secondaryItems, rowAction, avatarProps, onClick }: ListDataDisplay<R>) => {
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

  if (!rows.length) {
    return (
      <Box component="main" sx={{ width: 200, mt: 10, mb: 10, mr: "auto", ml: "auto" }}>
        No results.
      </Box>
    );
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
                return <Typography key={item.key} variant="body2">{item.render(row)}</Typography>
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