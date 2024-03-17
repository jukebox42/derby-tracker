"use client"
import { InputAdornment, MenuItem } from "@mui/material";
import { Level, Member, Permission } from "@prisma/client";

import { memberActions } from "#/app/actions";
import { validationSchema } from "#/lib/data/members";
import { PermissionButton } from "#/ui/smart";
import { levels, positions } from "#/lib/data/members";
import { FormProvider, TextField } from "#/ui/form";

type CreateData = Omit<Member, "id" | "createdAt" | "updatedAt">;

export const CreateModal = ({ refresh }: { refresh: () => void }) => (
  <FormProvider<CreateData, Member>
    title="Create Member"
    onSubmit={data => memberActions.create(data)}
    onSuccess={refresh}
    schema={validationSchema}
    variant="modal"
    openButton={open => (
      <PermissionButton
        permissions={[Permission.MEMBER_MANAGE]}
        purpose="create"
        onClick={open}
      >
        Add Member
      </PermissionButton>
    )}
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
  </FormProvider>
);