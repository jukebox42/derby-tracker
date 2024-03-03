import { List, ListItem, ListSubheader } from "@mui/material";
import { TitlePane } from "../..";
import React from "react";

export type PreviewCardProps = {
  title: string,
  lists: {
    title: string,
    items: { label: string, value: React.ReactNode }[],
  }[],
}

export const PreviewCard = ({ title, lists }: PreviewCardProps) => (
  <TitlePane boxSx={{ gap: 0 }} title={title}>
    {lists.map(list => (
      <List key={list.title} subheader={<ListSubheader disableGutters>{list.title}</ListSubheader>} dense>
        {list.items.map(item => (
          <ListItem key={item.label} disableGutters>
            {item.label}: {item.value}
          </ListItem>
        ))}
      </List>
    ))}
  </TitlePane>
);