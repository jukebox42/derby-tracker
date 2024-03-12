"use server"
import { redirect } from "next/navigation";
import { Box, ThemeProvider, Toolbar } from "@mui/material";

import { darkTheme } from "#/theme";
import { routes } from "#/lib/routes";
import { Shell } from "#/ui/shell";
import { ActionResponseType, authActions } from "../actions";
import { SiteProvider } from "#/context";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const data = await authActions.get();
  if (data.type === ActionResponseType.ERROR) {
    redirect(routes.LOGIN.path);
  }

  // TODO: can we handle path validation here too?

  const { member, session } = data.data;

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
              {children}
            </Box>
          </Box>
        </Box>
      </SiteProvider>
    </Box>
  );
}