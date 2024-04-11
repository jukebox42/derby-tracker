import { DataDisplay, DataDisplayListProps } from ".";
import { DataDisplayRow } from "./types";

export const DataDisplayList = <R extends DataDisplayRow,F>(params: DataDisplayListProps<R,F>) => (
  <DataDisplay
    {...params}
    variant="list"
    columnKeys={[]}
  />
);