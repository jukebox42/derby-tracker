"use client"
import { List, ListItem, ListSubheader, Typography } from "@mui/material";

import { UseConnectedEntity } from "@/hooks/useConnectedEntity";
import { Pane } from "@/components";
import { Definition } from "@/lib/data/types";

export type ConnectedAboutCardProps<T> = {
  title: string,
  lists: {
    title: string,
    keys: string[],
  }[],
  definition: Definition,
} & UseConnectedEntity<T, any>;

export const ConnectedAboutCard = <T,>({ title, entity, lists, definition, isLoading }: ConnectedAboutCardProps<T>) => {
  if (!entity) {
    return <></>;
  }

  return (
    <Pane sx={{ gap: 0 }}>
      <Typography variant="h6">{title}</Typography>
      {lists.map(list => (
        <List key={list.title} subheader={<ListSubheader disableGutters>{list.title}</ListSubheader>} dense>
          {list.keys.map(key => (
            <ListItem key={key} disableGutters>
              {definition[key].label}: {definition[key].render(entity)}
            </ListItem>
          ))}
        </List>
      ))}
    </Pane>
  );
};