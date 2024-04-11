import { useState } from "react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";

import { ErrorText } from "#/ui/form";
import { Loading } from "#/ui/common";

import { DataDisplayRow, SortOrder, TableDataDisplay } from "../types";

export const DataTable = <R extends DataDisplayRow,>({rows, columns, defaultSort, refresh, error, isLoading, rowAction}: TableDataDisplay<R>) => {
  const [orderBy, setOrderBy] = useState(defaultSort?.key);
  const [order, setOrder] = useState<SortOrder>(defaultSort?.direction ?? SortOrder.ASC);
  const cols = [...columns];
  
  if (rowAction) {
    cols.push({
      label: "Action",
      key: "_action",
      render: (params) => rowAction(params, refresh),
    });
  }

  const handleSort = (key: string) => {
    if (orderBy === key) {
      return setOrder(prev => prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC);
    }

    setOrderBy(key);
    setOrder(SortOrder.ASC);
  }

  const loadingRow = (
    <TableRow>
      <TableCell colSpan={cols.length}>
        <Loading simple />
      </TableCell>
    </TableRow>
  );

  const errorRow = (
    <TableRow>
      <TableCell colSpan={cols.length}>
        <Box component="main" sx={{ width: 200, mt: 10, mb: 10, mr: "auto", ml: "auto" }}>
          <ErrorText
            text={error}
            action={<Button onClick={refresh}>Retry</Button>}
          />
        </Box>
      </TableCell>
    </TableRow>
  );

  const emptyRow = (
    <TableRow>
      <TableCell colSpan={cols.length}>
        <Box component="main" sx={{ width: 200, mt: 10, mb: 10, mr: "auto", ml: "auto" }}>
          No results.
        </Box>
      </TableCell>
    </TableRow>
  );

  return (
    <TableContainer>
      <Table size="medium">
        <TableHead>
          <TableRow>
            {cols.map(col => (
              <TableCell key={col.key} sortDirection={orderBy === col.key ? order : false}>
                <TableSortLabel
                  active={orderBy === col.key}
                  direction={orderBy === col.key ? order : undefined}
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {error && errorRow}
          {(!error && isLoading) && loadingRow}
          {(!error && !isLoading && !rows.length) && emptyRow}
          {(!error && !isLoading && rows.length > 0) && rows.map(row => (
            <TableRow hover key={row.id}>
              {cols.map(col => (
                <TableCell key={col.key}>
                  {col.renderCell ? col.renderCell(row) : col.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}