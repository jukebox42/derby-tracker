import { ActionResponseType, memberActions } from "#/app/actions"
import { TitleCard } from "#/ui/common"
import { PermissionCheck, PromptButton } from "#/ui/smart"
import { Stack } from "@mui/material"
import { Permission } from "@prisma/client"
import { usePage } from "../[id]/context"

export const AdminControlsCard = () => {
  const { member, setMember } = usePage();

  const handleLoa = async () => {
    const result = await memberActions.toggleLoA(member.id, !member.isOnLoa);
    if (result.type === ActionResponseType.ERROR) {
      throw new Error(result.error.message);
    }
    setMember({ ...member, isOnLoa: result.data });
  }
  const handleActivate = async () => {
    const result = await memberActions.toggleActive(member.id, !member.active);
    if (result.type === ActionResponseType.ERROR) {
      throw new Error(result.error.message);
    }
    setMember({ ...member, active: !member.active });
  }

  return (
    <PermissionCheck permissions={[Permission.MEMBER_MANAGE]}>
      <TitleCard title="Admin Controls">
        <Stack direction="row" gap={2}>
          <PromptButton
            promptMessage={
              member.isOnLoa ?
              "You are about to take this player off a Leave of Absence." :
              "You are about to put this player on a Leave of Absence."
            }
            color="warning"
            permissions={[Permission.MEMBER_MANAGE]}
            onClick={handleLoa}
          >
            {member.isOnLoa ? "End Leave of Absence" : "Start Leave of Absence"}
          </PromptButton>
          <PromptButton
            promptMessage={
              member.active ?
              "You are about to deactivate this member. They will not be able to log in while deactivated." :
              "You are about to reactivate this member. This will restore their ability to login."
            }
            color={member.active ? "error" : "success"}
            permissions={[Permission.MEMBER_MANAGE]}
            onClick={handleActivate}
          >
            {member.active ? "Deactivate" : "Reactivate"}
          </PromptButton>
        </Stack>
      </TitleCard>
    </PermissionCheck>
  )
}