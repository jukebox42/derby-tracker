"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { cookies } from "next/headers";

import { authActions } from "../actions";
import { routes } from "#/lib/routes";
import { SESSION_COOKIE_NAME } from "#/lib/db/utils";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    cookies().delete(SESSION_COOKIE_NAME);
    authActions.logout().then(() => router.push(routes.LOGIN.path));
  }, []);

  return (
    <>
      <p>We hate to see you go, but we love to watch you skate away.</p>
      <p>(This is a butt joke)</p>
    </>
  );
}