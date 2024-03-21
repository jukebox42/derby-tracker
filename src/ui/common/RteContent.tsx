import theme from "#/theme";
import { Box, SxProps } from "@mui/material";

export const RteContent = ({ html }: { html: string }) => {
  const sx: SxProps = {
    ["& h1"]: theme.typography.h1,
    ["& h2"]: theme.typography.h2,
    ["& h3"]: theme.typography.h3,
    ["& h4"]: theme.typography.h4,
    ["& h5"]: theme.typography.h5,
    ["& h6"]: theme.typography.h6,
    ["& p"]: {
      mt: 0,
      mb: 1,
    },
    // TODO replace with link component?
    ["& a"]: {
      color: theme.palette.primary.main,
    }
    // TODO: finish styling
  }

  return (
    <Box sx={sx} dangerouslySetInnerHTML={{__html: html}} />
  );
};