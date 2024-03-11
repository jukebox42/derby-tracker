"use client"
import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, ChipProps, Divider, Stack, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import { Pane } from "../..";
import React from "react";

export type ProfileBannerProps = {
  title: string,
  chips?: ({ label: string } & Pick<ChipProps, "color">)[],
  highlights: { label: string, value: React.ReactNode }[],
  onAction?: () => void,
  actionDisabled?: boolean,
}

export const ProfileBanner = ({ title, chips, highlights, onAction, actionDisabled }: ProfileBannerProps) => {
  return (
    <Card elevation={3}>
      <CardMedia
        sx={{ height: { sm: 100, md: 150 } }}
        image="https://i.etsystatic.com/30097568/r/il/b9d938/3369548185/il_fullxfull.3369548185_mn08.jpg"
        title="green iguana"
      />
      <CardContent sx={{ display: "flex", flexDirection: "row", gap: 2, alignItems: "flex-end" }}>
        <Pane sx={{ width: { xs: 50, sm: 100, md: 150 }, height: { xs: 50, sm: 100, md: 150 }, p: .5, pb: 0, mt: { xs: 0, sm: "-60px", md: "-90px" } }} elevation={0}>
          <Avatar sx={{ width: "100%", height: "100%" }} variant="rounded">
            {title[0]}
          </Avatar>
        </Pane>
        <Box sx={{ flexGrow: 1 }}>
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            {chips && chips.map(chip => (
              <Chip label={chip.label} variant="outlined" color={chip.color} size="small" key={chip.label} />
            ))}
          </Stack>
          <Stack spacing={2} direction="row" divider={<Divider orientation="vertical" flexItem />}>
            {highlights.map(highlight => (
              <Typography key={highlight.label} variant="body2">{highlight.value}</Typography>
            ))}
          </Stack>
        </Box>
        <Box>
          <Button
            variant="contained"
            disabled={actionDisabled}
            startIcon={<EditIcon />}
            onClick={onAction}
          >
            Edit
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}