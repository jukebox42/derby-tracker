import { GridColDef, GridValidRowModel } from "@mui/x-data-grid";

import { Definition } from "./types";
import { string } from "yup";
import React from "react";

export const formatColumn = <R extends GridValidRowModel,>(key: string, definition: Definition, size: number): GridColDef<R> => ({
  field: key,
  headerName: definition[key].label,
  renderCell: definition[key].renderCell,
  type: definition[key].type,
  headerClassName: "controlled-table-header",
  flex: size
});

export type ListItemDef<R extends GridValidRowModel> = {
  field: string,
  label: string,
  render: (params: R) => React.ReactNode,
} 

export const formatListItem = <R extends GridValidRowModel,>(key: string, definition: Definition): ListItemDef<R> => ({
  field: key,
  label: definition[key].label,
  render: definition[key].render,
})