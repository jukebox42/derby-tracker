"use client"
import { Avatar, Container, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/navigation";

import { authActions } from "#/app/actions";
import { authValidationSchema } from "#/lib/data/auth";
import { routes } from "#/lib/routes";
import { Card } from "#/ui/common";
import { FormProvider, TextField } from "#/ui/form";

export default function Login() {
  const router = useRouter();

  return (
    <Container component="main" maxWidth="xs" sx={{ height: "100vh" }}>
      <Card
        sx={{
          gap: 0,
          alignItems: "center",
          top: "50%",
          transform: "translateY(-50%)",
          position: "relative",
        }}
      >
        <FormProvider
          schema={authValidationSchema}
          onSubmit={data => authActions.login(data.email, data.password)}
          onSuccess={() => router.push(routes.MEMBERS.path)}
          submitButtonText="Login"
          variant="unstyled"
          hideCancel
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Derby
          </Typography>
          <TextField
            required
            name="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
          />
          <TextField
            required
            label="Password"
            type="password"
            autoComplete="current-password"
            name="password"
          />
        </FormProvider>
      </Card>
    </Container>
  );
};