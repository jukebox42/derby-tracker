"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppBar, Box, Drawer, IconButton, ThemeProvider, Toolbar, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import { Loading, Navigation, Header, Profile } from "@/components";
import theme from "@/theme";
import { routes } from "@/lib/routes";
import { useStore } from "@/hooks/useStore";
import { darkTheme } from "@/theme/theme";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { session, member, checkAuth } = useStore(state => ({
    member: state.activeMember,
    session: state.session,
    checkAuth: state.checkAuth,
  }));
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter();

  const drawerWidth = 260;

  const handleAuth = async () => {
    const isLoggedIn = await checkAuth();
    if (!isLoggedIn) {
      return router.push(routes.LOGIN.path);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    handleAuth();
  }, []);

  if (isLoading || !member || !session) {
    return <Loading />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={darkTheme}>
      <Drawer
        variant={ matches ? "permanent" : "temporary" }
        open={matches || (!matches && isOpen)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          ["& .MuiDrawer-paper"]: {
            width: { xs: "100%", md: drawerWidth },
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
        <Toolbar />
        <Navigation />
        </Box>
        <Profile name={member.name} number={member.number} />
      </Drawer>
      <AppBar
        position="fixed"
        color="primary"
        enableColorOnDark
        sx={{
          left: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: { xs: "100%", md: drawerWidth },
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "block", md: "none" } }}
            onClick={() => setIsOpen(prev => !prev)}
          >
            <MenuIcon />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>
      </ThemeProvider>
      <Box sx={{ flexGrow: 1 }}>
        <Box component="main" p={3}>
          <Toolbar sx={{ display: { xs: "block", md: "none" } }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}