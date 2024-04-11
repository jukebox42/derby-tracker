"use client"
import { Alert, Box, Typography } from "@mui/material"
import { Announcement } from "@prisma/client"

import { announcementDefinition } from "#/lib/data/announcement"

export const AnnouncementBanners = ({announcements} : { announcements: Announcement[] }) => (
  <Box sx={{mr: -3, ml: -3, mt: -3}}>
    {announcements.map(a => (
      <Alert severity="warning" icon={false} key={a.title} sx={{ borderRadius: 0 }}>
        {announcementDefinition.description.render(a)}
        <Typography variant="caption">
          {announcementDefinition.author.render(a)} | {announcementDefinition.createdAt.render(a)}
        </Typography>
      </Alert>
    ))}
  </Box>
);