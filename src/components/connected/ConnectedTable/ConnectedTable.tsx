"use client";
import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridNoRowsOverlay, GridOverlay, gridClasses } from "@mui/x-data-grid";

import { Definition } from "@/lib/data/types";
import { formatColumn } from "@/lib/data/utils";

import { ErrorText } from "../..";
import { UseConnectedList } from "@/hooks/useConnectedList";

export type ConnectedTableProps<T> = {
  actions?: React.ReactNode | React.ReactNode[],
  columnKeys: string[],
  definition: Definition,
} & UseConnectedList<T, any>;

export const ConnectedTable = <T,>(props: ConnectedTableProps<T>) => {
  const { isLoading, rows, error, actions, columnKeys, definition, onRefresh } = props;
 
  const columns = columnKeys.map(key => formatColumn(key, definition));

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
      <Stack spacing={2} direction="row" flexWrap="wrap">
        {actions}
        <Box sx={{ flexGrow: 1}} />
        SEARCH BOX HERE
      </Stack>
      <Box width="100%">
        <DataGrid
          sx={{
            border: 0,
            borderRadius: 0,
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
              outline: 'none',
            },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
              {
                outline: 'none',
              },
            ["& .controlled-table-header"]: {
              backgroundColor: "background.paper",
            },
          }}
          autoHeight
          columns={columns}
          rows={rows}
          loading={isLoading}
          slots={{ 
            noRowsOverlay: error ? ErrorOverlay : GridNoRowsOverlay,
          }}
          density="comfortable"
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
        />
      </Box>
    </>
  );
}