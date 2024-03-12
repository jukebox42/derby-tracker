"use client";
import { usePathname, useRouter } from "next/navigation";
import { Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader } from "@mui/material";

import { Session } from "@prisma/client";

import { adminRoutes, filterRoutes, navigationRoutes } from "#/lib/routes";

export const Navigation = ({ session }: { session: Session }) => {
  const router = useRouter();
  const path = usePathname();

  const cleanNavRoutes = filterRoutes(session.permissions, navigationRoutes);
  const cleanSettingsRoutes = filterRoutes(session.permissions, adminRoutes);

  return (
    <>
      <List>
        <ListSubheader>Navigation</ListSubheader>
        {cleanNavRoutes.map((route) => (
          <ListItem key={route.label} disablePadding>
            <ListItemButton onClick={() => router.push(route.path)} selected={path.indexOf(route.path) === 0}>
              <ListItemText primary={route.label} />
            </ListItemButton>
          </ListItem>
        ))}
        {!!cleanSettingsRoutes.length && (
          <>
            <Divider />
            <ListSubheader>Admin</ListSubheader>
            {cleanSettingsRoutes.map((route) => (
              <ListItem key={route.label} disablePadding>
                <ListItemButton onClick={() => router.push(route.path)} selected={path.indexOf(route.path) === 0}>
                  <ListItemText primary={route.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        )}
      </List>
    </>
  );
}