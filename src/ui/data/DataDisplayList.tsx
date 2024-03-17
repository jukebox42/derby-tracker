import { DataDisplay, DataDisplayListProps } from ".";
import { BaseRow } from "./types";

export const DataDisplayList = <R extends BaseRow,F>(params: DataDisplayListProps<R,F>) => (
  <DataDisplay
    {...params}
    variant="list"
    columnKeys={[]}
  />
);