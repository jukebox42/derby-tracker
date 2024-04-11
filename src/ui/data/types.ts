import { Definition } from "#/lib/data/types";
import { AvatarProps } from "@mui/material";
import React from "react";

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export type DataDisplayRow = {
  id: string,
  [key: string]: any,
}

// TODO: definition pick
export type DataDisplayColumn<R> = {
  key: string,
  label: string,
  render: (params: R) => React.ReactNode,
  renderCell?: (params: R) =>  React.ReactNode,
}

export type GenericDataDisplay<R extends DataDisplayRow> = {
  columns: DataDisplayColumn<R>[],
  rows: R[],
  rowAction?: (params: R, refresh: () => void) => React.ReactNode,
  refresh: () => void,
  isLoading?: boolean,
  error?: string,
};

export type GenericSmartDataDisplay = {
  columnKeys: string[],
  definition: Definition,
}

// Table

export type TableDataDisplay<R extends DataDisplayRow> = {
  defaultSort?: {
    key: string,
    direction?: SortOrder,
  },
} & GenericDataDisplay<R>;

export type SmartTableDataDisplay<R extends DataDisplayRow> = GenericSmartDataDisplay & Omit<TableDataDisplay<R>, "columns">;

// List

export type ListDataDisplay<R extends DataDisplayRow> = {
  avatarProps?: (row: R) => AvatarProps,
  title: (row: R) => React.ReactNode,
  secondaryItems: DataDisplayColumn<R>[],
  description?: DataDisplayColumn<R>,
  onClick?: (row: R) => void,
} & Omit<GenericDataDisplay<R>, "columns">;

export type SmartListDataDisplay<R extends DataDisplayRow> = {
  titleKey: string,
  descriptionKey?: string,
} & GenericSmartDataDisplay & Omit<ListDataDisplay<R>, "description" | "title" | "secondaryItems" | "columns">;