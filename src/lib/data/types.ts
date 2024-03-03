import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";
import React from "react";

export type DefinitionItem = {
  key: string,
  label: string,
  type: string,
  map?: {[key: string]: string},
  render: (params: any) => React.ReactNode,
  renderCell?: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => React.ReactNode,
  validation: () => any,
}

export type Definition = Record<string, DefinitionItem>;