import { usePage } from "../[id]/context";
import { MemberContactFields, MemberFields, MemberSocialFields, contactFields, memberFields, socialFields } from "./fields";
import { Permission } from "@prisma/client";
import { FieldGrid, FormProvider } from "#/ui/form";
import { PermissionButton } from "#/ui/smart";
import { memberActions } from "#/app/actions";
import { Box, Divider, Typography } from "@mui/material";
import { MemberWithInfo } from "#/app/actions/members";
import { editValidationSchema } from "#/lib/data/members";
import { useSite } from "#/context";

// TODO: Maybe this should be sub forms? I didn't because this is the only place we really get complex... for now.

type Data = MemberFields & MemberSocialFields & MemberContactFields;

export const EditModal = () => {
  const { session } = useSite();
  const { member, setMember } = usePage();

  const social = member.social ?? {
    slack: null,
    facebook: null,
  }

  const contact = member.contact ?? {
    personalEmail: null,
    phone: null,
    address: null,
    city: null,
    state: null,
    zip: null,
  };

  const memberFieldVars = memberFields(member, member.id === session.memberId);
  const contactFieldVars = contactFields(contact);
  const socialFieldVars = socialFields(social);

  const handleSubmit = (data: Data) => {
    const socialData = {
      slack: data.slack,
      facebook: data.facebook
    };
    const contactData = {
      personalEmail: data.personalEmail,
      phone: data.phone,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
    };
    const memberData = {
      name: data.name,
      email: data.email,
      alias: data.alias ?? data.name,
      pronouns: data.pronouns,
      about: data.about,
      number: data.number,
      level: data.level,
      preferredPosition: data.preferredPosition,
    };

    return memberActions.edit(member.id, memberData, socialData, contactData);
  }

  return (
    <FormProvider<Data, MemberWithInfo>
      title="Edit Member"
      onSubmit={handleSubmit}
      onSuccess={data => setMember(data)}
      schema={editValidationSchema}
      variant="modal"
      openButton={open => (
        <PermissionButton
          permissions={[Permission.MEMBER_MANAGE]}
          memberId={member.id}
          purpose="edit"
          onClick={open}
        >
          Edit
        </PermissionButton>
      )}
    >
      <Box sx={{ display: "Flex", gap: 2, flexDirection: "column" }}>
        <FieldGrid fields={memberFieldVars} />
        <Divider />
        <Typography component="h2" variant="h4">Contact</Typography>
        <FieldGrid fields={contactFieldVars} />
        <Divider />
        <Typography component="h2" variant="h4">Social</Typography>
        <FieldGrid fields={socialFieldVars} />
      </Box>
    </FormProvider>
  );
};