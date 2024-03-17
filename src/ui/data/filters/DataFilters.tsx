import { Box } from "@mui/material"
import { FilterMenuString, FilterMenuStringProps } from "./FilterMenuString"
import { FilterMenuBoolean, FilterMenuBooleanProps } from "./FilterMenuBoolean"

export type FilterControls = 
  (Omit<FilterMenuStringProps, "onChange"> & { type: "string", name: string }) |
  (Omit<FilterMenuBooleanProps, "onChange"> & { type: "boolean", name: string });

export type DataFilterProps<F> = {
  filterControls?: FilterControls[],
  additionalFilterControls?: (filter: (filter: F) => void) => React.ReactNode | React.ReactNode[],
  filter: (filters: F) => void,
  filters?: F,
}

export const DataFilters = <F,>({ filterControls = [], filter, filters, additionalFilterControls }: DataFilterProps<F>) => {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {filterControls.map(control => {
        return control.type === "string" ?
          <FilterMenuString
            key={control.label}
            label={control.label}
            options={control.options}
            onChange={value => filter({ ...filters, [control.name]: value } as F)}
            defaultValue={control.defaultValue}
          /> : 
          <FilterMenuBoolean
            key={control.label}
            label={control.label}
            onChange={value => filter(({ ...filters, [control.name]: value } as F))}
            defaultValue={control.defaultValue}
          />
      })}
      {additionalFilterControls?.(filter)}
    </Box>
  )
}