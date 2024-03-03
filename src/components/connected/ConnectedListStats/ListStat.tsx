"use client"
import { Skeleton, Typography } from "@mui/material";
import { Pane } from "../..";

export type ListStatProps = {
  title: string,
  value: string,
  isLoading?: Boolean
}

export const ListStat = ({ title, value, isLoading }: ListStatProps) => (
  <Pane sx={{ alignItems: "center" }}>
    <Typography variant="h6">{title}</Typography>
    {isLoading ? <Skeleton /> : <Typography>{value}</Typography>}
  </Pane>
);