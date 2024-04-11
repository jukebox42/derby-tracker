"use server"
import { redirect } from "next/navigation";
import { Box, ThemeProvider, Toolbar } from "@mui/material";

import { darkTheme } from "#/theme";
import { routes } from "#/lib/routes";
import { Shell } from "#/ui/shell";
import { ActionResponseType, announcementActions, authActions } from "../actions";
import { SiteProvider } from "#/context";
import { Announcement } from "@prisma/client";
import { AnnouncementBanners } from "#/ui/templates";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const data = await authActions.get();
  if (data.type === ActionResponseType.ERROR) {
    redirect(routes.LOGIN.path);
  }

  // TODO: can we handle path validation here too?

  const { member, session } = data.data;

  const announcementResponse = await announcementActions.list();
  let announcements: Announcement[] = [];
  if (announcementResponse.type === ActionResponseType.OK) {
    announcements = announcementResponse.data;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <SiteProvider data={{ activeMember: member, session }}>
        <ThemeProvider theme={darkTheme}>
          <Shell member={member} session={session} />
        </ThemeProvider>
        <Box sx={{ flexGrow: 1 }}>
          <Box component="main" p={3}>
            <Toolbar sx={{ display: { xs: "block", md: "none" } }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <AnnouncementBanners announcements={announcements} />
              {children}
            </Box>
          </Box>
        </Box>
      </SiteProvider>
    </Box>
  );
}