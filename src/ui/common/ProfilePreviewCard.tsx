import { ChipProps } from "@mui/material";

import { InternalPreviewCard, PreviewCardProps, ProfileCard } from ".";

export type ProfilePreviewCardProps = {
  avatarUrl?: string,
  avatarCharacters?: string,
  chips?: ({ label: string } & Pick<ChipProps, "color">)[],
} & PreviewCardProps;

export const ProfilePreviewCard = ({ title, lists, chips, avatarUrl, avatarCharacters, actions }: ProfilePreviewCardProps) => (
  <ProfileCard boxSx={{ gap: 0 }} title={title} avatarUrl={avatarUrl} avatarCharacters={avatarCharacters} chips={chips}>
    <InternalPreviewCard lists={lists} actions={actions} />
  </ProfileCard>
);