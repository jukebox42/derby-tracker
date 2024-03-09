"use client";
import React, { useCallback } from "react";
import { Box, Button, Stack, TextField, debounce } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridDeleteIcon, GridNoRowsOverlay, GridOverlay, gridClasses } from "@mui/x-data-grid";

import { Definition } from "@/lib/data/types";
import { formatColumn } from "@/lib/data/utils";

import { ErrorText } from "../..";
import { UseConnectedListProps, useConnectedList } from "@/hooks/useConnectedList";
import { FilterMenuBoolean, FilterMenuBooleanProps } from "@/components/FilterMenuBoolean";
import { FilterMenuString, FilterMenuStringProps } from "@/components/FilterMenuString";

export type ConnectedFilterControls = 
  (Omit<FilterMenuStringProps, "onChange"> & { type: "string", name: string }) |
  (Omit<FilterMenuBooleanProps, "onChange"> & { type: "boolean", name: string });

export type ConnectedTableProps<T,F> = {
  actions?: React.ReactNode | React.ReactNode[] | ((refresh: () => void) => React.ReactNode | React.ReactNode[]),
  rowAction?: (row: T, refresh: () => void) => void,
  filterControls?: ConnectedFilterControls[],
  additionalFilterControls?: (filter: (filter: F) => void) => React.ReactNode | React.ReactNode[],
  columnKeys: string[],
  definition: Definition,
  onSearch?: (search: string) => void,
} & UseConnectedListProps<T, F>;

export const ConnectedTable = <T,F>(
  {
    api,
    defaultFilters,
    defaultSearch,
    searchFields,
    actions,
    rowAction,
    columnKeys,
    definition,
    filterControls = [],
    additionalFilterControls
  }: ConnectedTableProps<T,F>
) => {
  const {
    isLoading,
    rows,
    error,
    search,
    filters,
    filter,
    refresh
  } = useConnectedList({ api, defaultFilters, defaultSearch, searchFields });
  const columns = columnKeys.map(key => formatColumn(key, definition, 1 / (columnKeys.length + (!!rowAction ? 1 : 0))));

  if (rowAction) {
    columns.push({
      headerName: "Action",
      field: "action",
      type: "string",
      headerClassName: "controlled-table-header",
      flex: 1 / (columnKeys.length + 1),
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<GridDeleteIcon />}
          label="Delete"
          onClick={() => rowAction(params as T, refresh)}
          color="inherit"
        />
      )
    });
  }

  const ErrorOverlay = () => (
    <GridOverlay>
      <ErrorText
        text={error}
        action={<Button onClick={refresh}>Retry</Button>}
      />
    </GridOverlay>
  );

  const handleSearch = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => search?.(event.target.value), 300),
    []
  );

  return (
    <>
      {(actions || searchFields) && (
        <Stack spacing={2} direction="row" flexWrap="wrap">
            <Box sx={{ flexGrow: 1}}>
              {searchFields && (
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search..."
                  onChange={handleSearch}
                />
              )}
            </Box>
            {typeof actions === "function" ? actions(refresh) : actions}
        </Stack>
      )}
      {(!!filterControls.length || additionalFilterControls) && (
        <Box sx={{ display: "flex", gap: 1 }}>
          {filterControls.map(control => {
            return control.type === "string" ?
              <FilterMenuString
                label={control.label}
                options={control.options}
                onChange={value => filter({ ...filters, [control.name]: value } as F)}
                defaultValue={control.defaultValue}
              /> : 
              <FilterMenuBoolean
                label={control.label}
                onChange={value => filter(({ ...filters, [control.name]: value } as F))}
                defaultValue={control.defaultValue}
              />
          })}
          {additionalFilterControls?.(filter)}
        </Box>
      )}
      <Box width="100%">
        <DataGrid
          sx={{
            border: 0,
            borderRadius: 0,
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
              outline: "none",
            },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
              {
                outline: "none",
              },
            ["& .controlled-table-header"]: {
              backgroundColor: "background.paper",
            },
          }}
          autoHeight
          columns={columns}
          rows={rows}
          editMode="row"
          loading={isLoading}
          slots={{ 
            noRowsOverlay: error ? ErrorOverlay : GridNoRowsOverlay,
          }}
          disableColumnFilter
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