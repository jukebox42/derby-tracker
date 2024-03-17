import { useCallback } from "react";
import { Box, Stack, TextField, debounce } from "@mui/material";

export type DataSearchProps = {
  showSearch?: boolean,
  search: (search: string) => void,
  actions?: React.ReactNode | React.ReactNode[] | ((refresh: () => void) => React.ReactNode | React.ReactNode[]),
  refresh: () => void,
}

export const DataSearch = ({ showSearch = true, search, actions, refresh }: DataSearchProps) => {
  const handleSearch = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => search?.(event.target.value), 300),
    []
  );

  return (
    <Stack spacing={2} direction="row" flexWrap="wrap">
      <Box sx={{ flexGrow: 1}}>
        {showSearch && (
          <TextField
            fullWidth
            size="small"
            placeholder="Search..."
            onChange={handleSearch}
          />
        )}
      </Box>
      {typeof actions === "function" ? actions(refresh) : actions}
    </Stack>
  );
}