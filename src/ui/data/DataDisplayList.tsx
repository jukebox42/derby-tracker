import { GridValidRowModel } from "@mui/x-data-grid";
import { DataDisplay, DataDisplayListProps } from ".";

export const DataDisplayList = <R extends GridValidRowModel,F>(params: DataDisplayListProps<R,F>) => (
  <DataDisplay
    {...params}
    variant="list"
    columnKeys={[]}
  />
);