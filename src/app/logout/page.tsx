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

  return <></>;
}