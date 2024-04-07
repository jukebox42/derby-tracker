import { useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { GenericDataDisplay } from "../types";
import { GridValidRowModel } from "@mui/x-data-grid";
import { ErrorText } from "#/ui/form";
import { Loading } from "#/ui/common";

export enum Order {
  ASC = "asc",
  DESC = "desc",
}

type Props<R extends GridValidRowModel> = {
  columns: any[],
  defaultSort: {
    key: string,
    direction?: Order,
  },
} & GenericDataDisplay<R>

export const DataTable = <R extends GridValidRowModel,>({rows, columns, defaultSort, refresh, error, isLoading, rowAction}: Props<R>) => {
  const [orderBy, setOrderBy] = useState(defaultSort.key);
  const [order, setOrder] = useState<Order>(defaultSort.direction ?? Order.ASC);
  const cols = [...columns];
  if (rowAction) {
    cols.push({
      key: "_actions",
      label: "",
    })
  }
  
  if (rowAction) {
    cols.push({
      headerName: "Action",
      field: "action",
      type: "string",
      renderCell: (params) => rowAction(params, refresh),
    });
  }

  const handleSort = (key: string) => {
    if (orderBy === key) {
      return setOrder(prev => prev === Order.ASC ? Order.DESC : Order.ASC);
    }

    setOrderBy(key);
    setOrder(Order.ASC);
  }

  const loadingRow = (
    <TableRow>
      <TableCell rowSpan={cols.length}>
        <Loading />
      </TableCell>
    </TableRow>
  );

  const errorRow = (
    <TableRow>
      <TableCell rowSpan={cols.length}>
        <ErrorText
          text={error}
          action={<Button onClick={refresh}>Retry</Button>}
        />
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
          {(!error && !isLoading) && rows.map(row => (
            <TableRow hover key={row.id}>
              {cols.map(col => (
                <TableCell>
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