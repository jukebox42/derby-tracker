import React from "react";
import { GridRenderCellParams, GridTreeNodeWithRender, GridValidRowModel } from "@mui/x-data-grid";

export type GenericDataDisplay<R extends GridValidRowModel> = {
  rows: R[],
  rowAction?: (params: GridRenderCellParams<R, any, any, GridTreeNodeWithRender>, refresh: () => void) => React.ReactNode,
  refresh: () => void,
  isLoading?: boolean,
  error?: string,
};