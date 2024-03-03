import React from "react";
import { Button } from "@mui/material";

export type TabButtonProps = {
  activeKey: string,
  tabKey: string,
  onClick: () => void,
  children: React.ReactNode,
}

export const TabButton = ({ activeKey, tabKey, onClick, children }: TabButtonProps) => (
  <Button variant={tabKey === activeKey ? "contained" : "outlined"} onClick={onClick}>
    {children}
  </Button>
);