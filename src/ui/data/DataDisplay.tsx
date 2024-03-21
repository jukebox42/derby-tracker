"use client"
import React from "react";
import { AvatarProps, Box } from "@mui/material";
import { GridValidRowModel } from "@mui/x-data-grid";

import { Definition } from "#/lib/data/types";
import { formatColumn, formatListItem } from "#/lib/data/utils";

import { UseConnectedListProps, useConnectedList } from "#/hooks/useConnectedList";
import { DataTable } from "./table/DataTable";
import { DataFilterProps, DataFilters } from "./filters/DataFilters";
import { useBreakpoints } from "#/hooks/useBreakpoint";
import { DataList } from "./list/DataList";
import { DataSearch, DataSearchProps } from "./filters/DataSearch";
import { GenericDataDisplay } from "./types";

// TODO: Rebuild this better

type BaseDataDisplayProps<R extends GridValidRowModel,F> = {
  definition: Definition,
  onSearch?: (search: string) => void,
  variant?: "auto" | "table" | "list",
} &
  UseConnectedListProps<R, F> &
  Pick<GenericDataDisplay<GridValidRowModel>, "rowAction"> &
  Pick<DataSearchProps, "actions"> &
  Pick<DataFilterProps<F>, "additionalFilterControls" | "filterControls">;

export type DataDisplayTableProps<R extends GridValidRowModel,F> = {
  columnKeys: string[],
} & BaseDataDisplayProps<R,F>;

export type DataDisplayListProps<R extends GridValidRowModel,F> = {
  /**
   * The key of the column to use for a title. If listOnClick is NOT provided then we will render()
   * this field to it returns a link. otherwise we will use this string raw.
   */
  titleColumnKey: string,
  listColumnKeys: string[],
  listAvatarProps?: (row: R) => AvatarProps,
  listOnClick?: (row: R) => void,
  listDescriptionKey?: string,
} & BaseDataDisplayProps<R,F>;

export type DataDisplayProps<R extends GridValidRowModel,F> = {
  variant?: "auto" | "table" | "list",
} &
  DataDisplayListProps<R,F> &
  DataDisplayTableProps<R,F>;
  

export const DataDisplay = <R extends GridValidRowModel,F>(
  {
    variant,
    api,
    defaultFilters,
    defaultSearch,
    searchFields,
    actions,
    rowAction,
    titleColumnKey,
    columnKeys,
    listAvatarProps,
    listColumnKeys,
    listOnClick,
    listDescriptionKey,
    definition,
    filterControls = [],
    additionalFilterControls,
  }: DataDisplayProps<R,F>
) => {
  const {
    isLoading,
    rows,
    error,
    search,
    filters,
    filter,
    refresh,
  } = useConnectedList({ api, defaultFilters, defaultSearch, searchFields });
  const { md } =  useBreakpoints();
  const columns = columnKeys.map(key => formatColumn(key, definition, 1 / (columnKeys.length + (!!rowAction ? 1 : 0))));
  const listColumns = listColumnKeys.map(key => formatListItem(key, definition));
  const description = listDescriptionKey ? formatListItem(listDescriptionKey, definition) : undefined;

  const listTitle = (row: R) => {
    if (listOnClick) {
      return row[titleColumnKey];
    }
    const item = formatListItem(titleColumnKey, definition);
    return item.render(row);
  }

  return (
    <>
      {(actions || searchFields) && (
        <DataSearch
          showSearch={!!searchFields?.length}
          actions={actions}
          refresh={refresh}
          search={search}
        />
      )}
      {(!!filterControls.length || additionalFilterControls) && (
        <DataFilters<F>
          filterControls={filterControls}
          filter={filter}
          filters={filters}
          additionalFilterControls={additionalFilterControls}
        />
      )}
      <Box width="100%">
        {(md && variant !== "list") || variant === "table" ? (
          <DataTable
            rows={rows}
            columns={columns}
            refresh={refresh}
            error={error}
            isLoading={isLoading}
            rowAction={rowAction}
          />
        ) : (
          <DataList
            rows={rows}
            title={listTitle}
            onClick={listOnClick}
            description={description}
            secondaryItems={listColumns}
            avatarProps={listAvatarProps}
            refresh={refresh}
            error={error}
            isLoading={isLoading}
            rowAction={rowAction}
          />
        )}
      </Box>
    </>
  );
}