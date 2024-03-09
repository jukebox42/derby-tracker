"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authActions } from "../actions";
import { routes } from "@/lib/routes";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    authActions.logout().then(() => router.push(routes.LOGIN.path));
  }, []);

  return <>We hate to see you go, but we love to watch you skate away</>;
}