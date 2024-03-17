"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { authActions } from "#/app/actions";
import { routes } from "#/lib/routes";
import { Box, Container, Typography } from "@mui/material";

export default function Login() {
  const router = useRouter();

  const logout = async () => {
    await authActions.logout();
    router.push(routes.LOGIN.path)
  }

  useEffect(() => {
    logout();
  }, []);

  return (
    <Container component="main" maxWidth="sm" sx={{ height: "100vh" }}>
      <Box
        sx={{
          gap: 0,
          textAlign: "center",
          top: "50%",
          transform: "translateY(-50%)",
          position: "relative",
        }}
      >
        <Typography variant="h2" sx={{ fontFamily: "Caveat", fontWeight: 400, fontStyle: "normal" }}>
          We hate to see you go, but we love to watch you skate away.
        </Typography>
        <Typography variant="h4" sx={{ fontFamily: "Caveat", fontWeight: 400, fontStyle: "normal" }}>
          (This is a butt joke)
        </Typography>
      </Box>
    </Container>
  );
}