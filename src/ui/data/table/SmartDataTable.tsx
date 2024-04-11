// TODO: Rename me

import { hasPermission } from "#/app/actions";
import { useSite } from "#/context";
import { DataDisplayRow, SmartTableDataDisplay } from "../types";
import { formatColumn } from "../utils";
import { DataTable } from "./DataTable";

export const SmartDataTable = <R extends DataDisplayRow,>({ columnKeys, definition, ...rest }: SmartTableDataDisplay<R>) => {
  const { session } = useSite();
  const columns = columnKeys.filter(key => hasPermission(definition[key].permissions ?? [], session)).map(key => formatColumn(key, definition));

  return (
    <DataTable
      columns={columns}
      {...rest}
    />
  );
}