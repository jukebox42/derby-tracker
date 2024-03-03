"use client";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { Permission } from "@prisma/client";
import { memberDefinition as md } from "@/lib/data/members";

import { Pane, PreviewCard, TitlePane } from "@/components";
import { useStore } from "@/hooks/useStore";
import { usePage } from "../context";
import { Stack } from "@mui/material";

export default function Page() {
  const { member } = usePage();
  const session = useStore(state => state.session);
  const canManage = session?.permissions.find(p => p === Permission.MEMBER_MANAGE);

  const aboutList = [
    { label: md.name.label, value: member.name },
    { label: md.level.label, value: md.level.render(member) },
  ];

  const contactList = [
    ...(canManage ? [{ label: md.email.label, value: member.email }] : []),
    { label: md.slackUsername.label, value: md.slackUsername.render(member) },
    { label: md.facebookLink.label, value: md.facebookLink.render(member) },
  ];

  const adminList = [
    { label: md.updatedAt.label, value: md.updatedAt.render(member) },
    { label: md.createdAt.label, value: md.createdAt.render(member) },
  ];

  return (
    <Grid container spacing={3}>
      <Grid xs={12} lg={4}>
        <PreviewCard
          title="Details"
          lists={[
            { title: "About", items: aboutList },
            { title: "Contact", items: contactList },
            ...(canManage ? [{ title: "Admin", items: adminList }]: [])
          ]}
        />
      </Grid>
      <Grid xs={12} lg={8}>
        <Stack spacing={3}>
          <TitlePane title="About">
            {md.about.render(member)}
          </TitlePane>
          <Pane>
            <pre>{JSON.stringify(member, null, 2)}</pre>
          </Pane>
        </Stack>
      </Grid>
    </Grid>
  );
}