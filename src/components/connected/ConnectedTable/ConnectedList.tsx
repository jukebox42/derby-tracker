"use client";
import React from "react";
import { Avatar, Box, Button, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from "@mui/material";
import { DataGrid, GridNoRowsOverlay, GridOverlay, gridClasses } from "@mui/x-data-grid";

import { Definition } from "@/lib/data/types";
import { formatColumn } from "@/lib/data/utils";

import { ErrorText } from "../..";
import { UseConnectedList } from "@/hooks/useConnectedList";

export type ConnectedTableProps<T> = {
  actions?: React.ReactNode | React.ReactNode[],
  title: (row: T) => React.ReactNode,
  onClick: (row: T) => void,
  columnKeys: string[],
  definition: Definition,
} & UseConnectedList<T, any>;

export const ConnectedList = <T,>(props: ConnectedTableProps<T>) => {
  const { isLoading, rows, error, title, actions, columnKeys, definition, onRefresh, onClick } = props;
 
  // const columns = columnKeys.map(key => formatColumn(key, definition));

  const ErrorOverlay = () => (
    <GridOverlay>
      <ErrorText
        text={error}
        action={<Button onClick={onRefresh}>Retry</Button>}
      />
    </GridOverlay>
  );

  return (
    <>
      <List sx={{ width: "100%" }}>
        {rows.map(row => (
          <>
            <ListItemButton key={(row as any).id} onClick={() => onClick(row)}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={title(row)}
                secondary={
                  <Stack spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem />}>
                    {columnKeys.map((col) => (
                      <Typography key={col} variant="body2">{definition[col].render(row)}</Typography>
                    ))}
                  </Stack>
                }
              />
            </ListItemButton>
            <Divider component="li" />
          </>
        ))}
      </List>
    </>
  );
}