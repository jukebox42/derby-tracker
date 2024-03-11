"use client";
import { Stack } from "@mui/material";

import { memberDefinition as md } from "@/lib/data/members";
import { Pane, TitlePane } from "@/components";

import { usePage } from "../context";

export default function Page() {
  const { member } = usePage();

  return (
    <Stack spacing={3}>
      <TitlePane title="Bio">
        {md.about.render(member)}
      </TitlePane>
      <Pane>
        <pre>{JSON.stringify(member, null, 2)}</pre>
      </Pane>
    </Stack>
  );
}