"use client";
import { Stack } from "@mui/material";

import { memberDefinition as md } from "#/lib/data/members";
import { Card, TitleCard } from "#/ui/common";

import { usePage } from "../context";
import { AdminControlsCard } from "../../_ui/AdminControlsCard";

export default function Page() {
  const { member } = usePage();

  return (
    <Stack spacing={3}>
      <AdminControlsCard />
      <TitleCard title="Bio">
        {md.about.render(member)}
      </TitleCard>
      <Card>
        <pre>{JSON.stringify(member, null, 2)}</pre>
      </Card>
    </Stack>
  );
}