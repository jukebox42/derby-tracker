import { GridValidRowModel } from "@mui/x-data-grid";
import { DataDisplay, DataDisplayTableProps } from ".";

export const DataDisplayTable = <R extends GridValidRowModel,F>(params: DataDisplayTableProps<R,F>) => (
  <DataDisplay
    {...params}
    variant="table"
    titleColumnKey=""
    listColumnKeys={[]}
  />
);