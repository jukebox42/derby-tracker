"use client"
import { Box } from "@mui/material";
import { ListStat, ListStatProps } from "./ListStat";
import { UseConnectedList } from "@/hooks/useConnectedList";

export type ListStatsProps<T> = {
  stats: ListStatProps[],
} & UseConnectedList<T, any>;

export const ConnectedListStats = <T,>({ stats, isLoading }: ListStatsProps<T>) => (
  <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
    {stats.map(s => (
      <ListStat key={s.title} title={s.title} value={s.value} isLoading={isLoading} />
    ))}
  </Box>
);