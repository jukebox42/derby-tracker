"use client"
import LockResetIcon from '@mui/icons-material/LockReset';

import { passwordActions } from "#/app/actions";
import { PermissionButton } from "#/ui/smart";

import { usePage } from "../[id]/context";
import { FormProvider, TextField } from "#/ui/form";
import { validationSchema } from "#/lib/data/password";

type CreateData = { password: string, newPassword: string, };

export const ChangePasswordModal = () => {
  const { member } = usePage();

  return (
    <FormProvider<CreateData, boolean>
      title="Change password"
      onSubmit={data => passwordActions.change(member.id, data.password, data.newPassword)}
      onSuccess={() => null}
      schema={validationSchema}
      variant="modal"
      openButton={open => (
        <PermissionButton
          memberId={member.id}
          startIcon={<LockResetIcon />}
          onClick={open}
        >
          Change Password
        </PermissionButton>
      )}
    >
      <TextField
        required
        label="Current Password"
        name="password"
        type="password"
        autoComplete="current-password"
        defaultValue=""
      />

      <TextField
        required
        label="Current Password"
        name="newPassword"
        type="password"
        autoComplete="new-password"
        defaultValue=""
      />
    </FormProvider>
  );
};