"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import { Loading, Navigation, Header } from "@/components";
import theme from "@/theme";
import { routes } from "@/lib/routes";
import { useStore } from "@/hooks/useStore";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const router = useRouter();
  const checkAuth = useStore(state => state.checkAuth);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box sx={{ display: "flex" }}>
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
        <Box>
          <Toolbar />
        </Box>
        <Navigation />
      </Drawer>
      <AppBar
        position="fixed"
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
      <Box sx={{ flexGrow: 1 }}>
        <Box component="main" p={3}>
          <Toolbar sx={{ display: { xs: "block", md: "none" } }} />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography sx={{ display: { xs: "block", md: "none" } }} variant="h4">Members</Typography>
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}