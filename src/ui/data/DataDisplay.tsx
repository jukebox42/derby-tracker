"use client"
import React from "react";
import { AvatarProps, Box } from "@mui/material";

import { Definition } from "#/lib/data/types";

import { UseConnectedListProps, useConnectedList } from "#/hooks/useConnectedList";
import { DataFilterProps, DataFilters } from "./filters/DataFilters";
import { useBreakpoints } from "#/hooks/useBreakpoint";
import { DataSearch, DataSearchProps } from "./filters/DataSearch";
import { DataDisplayRow, GenericDataDisplay } from "./types";
import { SmartDataTable } from "./table/SmartDataTable";
import { SmartDataList } from "./list/SmartDataList";

// TODO: Rebuild this better

type BaseDataDisplayProps<R extends DataDisplayRow,F> = {
  definition: Definition,
  onSearch?: (search: string) => void,
  variant?: "auto" | "table" | "list",
} &
  UseConnectedListProps<R, F> &
  Pick<GenericDataDisplay<R>, "rowAction"> &
  Pick<DataSearchProps, "actions"> &
  Pick<DataFilterProps<F>, "additionalFilterControls" | "filterControls">;

export type DataDisplayTableProps<R extends DataDisplayRow,F> = {
  columnKeys: string[],
} & BaseDataDisplayProps<R,F>;

export type DataDisplayListProps<R extends DataDisplayRow,F> = {
  /**
   * The key of the column to use for a title. If listOnClick is NOT provided then we will render()
   * this field to it returns a link. otherwise we will use this string raw.
   */
  listTitleKey: string,
  listDescriptionKey?: string,
  listColumnKeys: string[],
  listAvatarProps?: (row: R) => AvatarProps,
  listOnClick?: (row: R) => void,
} & BaseDataDisplayProps<R,F>;

export type DataDisplayProps<R extends DataDisplayRow,F> = {
  variant?: "auto" | "table" | "list",
} &
  DataDisplayListProps<R,F> &
  DataDisplayTableProps<R,F>;

export const DataDisplay = <R extends DataDisplayRow,F>(
  {
    variant,
    api,
    defaultFilters,
    defaultSearch,
    searchFields,
    actions,
    rowAction,
    listTitleKey,
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
          <SmartDataTable
            rows={rows}
            columnKeys={columnKeys}
            refresh={refresh}
            error={error}
            isLoading={isLoading}
            rowAction={rowAction as any}
            definition={definition}
          />
        ) : (
          <SmartDataList
            rows={rows}
            titleKey={listTitleKey}
            descriptionKey={listDescriptionKey}
            columnKeys={listColumnKeys}
            onClick={listOnClick as any}
            avatarProps={listAvatarProps as any}
            refresh={refresh}
            error={error}
            isLoading={isLoading}
            rowAction={rowAction as any}
            definition={definition}
          />
        )}
      </Box>
    </>
  );
}