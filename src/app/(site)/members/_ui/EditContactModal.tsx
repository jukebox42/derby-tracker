"use client"
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { MemberContact, Permission } from "@prisma/client";

import { memberContactActions } from "#/app/actions";
import { PermissionButton } from "#/ui/smart";
import { FormProvider, TextField } from "#/ui/form";
import { memberContactDefinition as mcd, validationSchema } from "#/lib/data/memberContact";

import { usePage } from "../[id]/context";
import { states } from "#/lib/states";
import { MenuItem } from "@mui/material";

type CreateData = Omit<MemberContact, "member" | "memberId">;

export const EditContactModal = () => {
  const { member, setMember } = usePage();

  const contact = member.contact ?? {
    personalEmail: null,
    phone: null,
    address: null,
    city: null,
    state: null,
    zip: null,
  };

  // TODO: we could probably make this a component that renders fields.
  const fields = [
    { 
      name: mcd.personalEmail.key,
      label: mcd.personalEmail.label,
      value: contact.personalEmail,
      type: "email",
    },
    { 
      name: mcd.phone.key,
      label: mcd.phone.label,
      value: contact.phone,
      type: "phone"
    },
    { 
      name: mcd.address.key,
      label: mcd.address.label,
      value: contact.address,
    },
    {
      name: mcd.city.key,
      label: mcd.city.label,
      value: contact.city,
    },
    {
      name: mcd.state.key,
      label: mcd.state.label,
      value: contact.state,
      options: states,
    },
    {
      name: mcd.zip.key,
      label: mcd.zip.label,
      value: contact.zip,
    },
  ];

  return (
    <FormProvider<CreateData, MemberContact>
      title="Edit Contact Info"
      onSubmit={data => memberContactActions.edit(member.id, data)}
      onSuccess={(data) => setMember(prev => ({ ...prev, contact: data }))}
      schema={validationSchema}
      variant="modal"
      openButton={open => (
        <PermissionButton
          permissions={[Permission.MEMBER_MANAGE]}
          purpose="edit"
          onClick={open}
          isIconButton
        />
      )}
    >
      <Grid container spacing={2}>
        {fields.map(f => (
          <Grid sm={12} md={6} key={f.name}>
            <TextField
              select={!!f.options}
              label={f.label}
              type={f.type}
              name={f.name}
              defaultValue={f.value}
              key={f.value}
            >
              {f.options && Object.keys(f.options).map(l => (
                <MenuItem key={l} value={l}>{f.options[l]}</MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}
      </Grid>
    </FormProvider>
  );
};