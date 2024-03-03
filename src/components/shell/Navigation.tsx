"use client";
import { adminRoutes, filterRoutes, navigationRoutes } from "@/lib/routes";
import { Profile } from "./Profile";
import { Divider, List, ListItem, ListItemButton, ListItemText, ListSubheader } from "@mui/material"
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/hooks/useStore";

type Props = {

}

export const Navigation = (props: Props) => {
  const router = useRouter();
  const path = usePathname();
  const { session, member } = useStore(state => ({
    member: state.activeMember,
    session: state.session,
  }));

  if(!member || !session) {
    return <></>;
  }

  const cleanNavRoutes = filterRoutes(session.permissions, navigationRoutes);
  const cleanSettingsRoutes = filterRoutes(session.permissions, adminRoutes);

  return (
    <>
      <Profile name={member.name} number={member.number} />
      <Divider />
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