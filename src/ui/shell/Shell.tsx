"use client"
import { useState } from "react";
import { AppBar, Box, Drawer, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Member, Session } from "@prisma/client";

import theme from "#/theme"
import { Profile } from "./Profile";
import { Navigation } from "./Navigation";
import { Header } from "./Header";

export const Shell = ({ member, session }: { member: Member, session: Session }) => {
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [isOpen, setIsOpen] = useState(false);

  const drawerWidth = 260;

  return (
    <>
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
          <Navigation session={session} />
        </Box>
        <Profile name={member.name} memberId={member.id} />
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
    </>
  )
}