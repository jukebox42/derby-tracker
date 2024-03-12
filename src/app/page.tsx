"use client";

import { routes } from "#/lib/routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {  
  const router = useRouter();

  useEffect(() => {
    router.push(routes.LOGIN.path);
  }, []);

  return (
    <></>
  );
}