"use client";
import { InputAdornment, MenuItem } from "@mui/material";
import { useRouter } from "next/navigation";

import { Level, Member } from "@prisma/client";
import { memberActions } from "#/app/actions";
import { positions, levels, validationSchema } from "#/lib/data/members";

import { ConnectedForm, TextField } from "#/components";
import { routes } from "#/lib/routes";

type CreateMemberData = Omit<Member, "id" | "createdAt" | "updatedAt">;

export default function Page() {
  const router = useRouter();
  return (
    <ConnectedForm<CreateMemberData,Member>
      title={routes.MEMBERS_CREATE.label}
      onCancel={() => router.push(routes.MEMBERS.path)}
      onSubmit={data => memberActions.create(data)}
      onSuccess={data => router.push(`${routes.MEMBERS.path}/${data.id}`)}
      schema={validationSchema}
      variant="slotModal"
    >
      <TextField
        required
        label="Real Name"
        name="name"
        autoFocus
      />

      <TextField
        required
        label="Email Address"
        name="email"
        type="email"
      />

      <TextField
        label="Derby Name"
        name="alias"
      />

      <TextField
        label="Number"
        name="number"
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>,
        }}
      />

      <TextField
        select
        required
        label="Level"
        defaultValue={Level.ROOKIE}
        name="level"
      >
        {Object.keys(levels).map(l => (
          <MenuItem key={l} value={l}>{levels[l]}</MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Preferred Position"
        name="preferredPosition"
      >
        {Object.keys(positions).map(p => (
          <MenuItem key={p} value={p}>{positions[p]}</MenuItem>
        ))}
      </TextField>
    </ConnectedForm>
  );
}