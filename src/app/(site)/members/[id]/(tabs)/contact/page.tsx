"use client"
import { TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { TitleCard } from "#/ui/common";
import { memberContactDefinition as mcd } from "#/lib/data/memberContact";

import { usePage } from "../../context";
import { EditContactModal } from "../../../_ui/EditContactModal";


export default function Page({ params: { id } }: { params: { id: string }}) {
  const { member } = usePage();

  // TODO: is this how we want to display arbitrary data?

  const contact = member.contact ?? {};

  const contactInfo = [
    { label: mcd.personalEmail.label, value: mcd.personalEmail.render(contact) },
    { label: mcd.phone.label, value: mcd.phone.render(contact) },
  ];

  const info = [
    { label: mcd.address.label, value: mcd.address.render(contact) },
    { label: mcd.city.label, value: mcd.city.render(contact) },
    { label: mcd.state.label, value: mcd.state.render(contact) },
    { label: mcd.zip.label, value: mcd.zip.render(contact) },
  ];

  return (
    <>
      <TitleCard title="Contact" action={<EditContactModal  />}>
        <Grid container spacing={2}>
          {contactInfo.map(i => (
            <Grid sm={12} md={6} key={i.label}>
              <TextField fullWidth label={i.label} value={i.value} disabled key={i.value?.toString()} />
            </Grid>
          ))}
        </Grid>
        <Typography component="h1" variant="h4">Address</Typography>
        <Grid container spacing={2}>
          {info.map(i => (
            <Grid sm={12} md={6} key={i.label}>
              <TextField fullWidth label={i.label} value={i.value} disabled key={i.value?.toString()} />
            </Grid>
          ))}
        </Grid>
      </TitleCard>
    </>
  );
}