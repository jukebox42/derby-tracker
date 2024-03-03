"use client"

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const useTab = (basePath: string): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const router = useRouter();
  const currentPath = usePathname();
  const [tab, setTab] = useState(currentPath.replace(basePath, ""));

  useEffect(() => {
    const newPath = `${basePath}${tab}`;
    if (newPath === currentPath) {
      return;
    }
    router.push(newPath);
  }, [tab]);

  return [tab, setTab];
}