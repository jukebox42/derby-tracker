"use client";
import { Stack } from "@mui/material";

import { memberDefinition as md } from "#/lib/data/members";
import { Card, TitleCard } from "#/ui/common";

import { usePage } from "../context";

export default function Page() {
  const { member } = usePage();

  return (
    <Stack spacing={3}>
      <TitleCard title="Bio">
        {md.about.render(member)}
      </TitleCard>
      <Card>
        <pre>{JSON.stringify(member, null, 2)}</pre>
      </Card>
    </Stack>
  );
}