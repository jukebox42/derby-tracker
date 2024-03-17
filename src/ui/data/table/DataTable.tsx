"use client"
import { DataGrid, GridColDef, GridNoRowsOverlay, GridOverlay, GridValidRowModel, gridClasses } from "@mui/x-data-grid";
import { Button } from "@mui/material";

import { ErrorText } from "#/ui/form";

import { GenericDataDisplay } from "../types";

// TODO: better typings for this component

type Props<R extends GridValidRowModel> = {
  columns: GridColDef<R>[],
} & GenericDataDisplay<R>;

const sx = {
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
    fontWeight: 700,
  },
};

export const DataTable = <R extends GridValidRowModel,>({ rows, columns, refresh, error, isLoading, rowAction }: Props<R>) => {
  // for some reason columns is persisting between renders
  const cols = [...columns];
  const ErrorOverlay = () => (
    <GridOverlay>
      <ErrorText
        text={error}
        action={<Button onClick={refresh}>Retry</Button>}
      />
    </GridOverlay>
  );

  if (rowAction) {
    cols.push({
      headerName: "Action",
      field: "action",
      type: "string",
      headerClassName: "controlled-table-header",
      flex: 1 / (columns.length + 1),
      renderCell: (params) => rowAction(params, refresh),
    });
  }

  return (
    <DataGrid
      sx={sx}
      autoHeight
      columns={cols}
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
  );
}