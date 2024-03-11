import * as Yup from "yup";

export const groupIdValidationSchema = Yup.object().shape({
  groupId: Yup.string().required("A group is required."),
});

export const memberIdValidationSchema = Yup.object().shape({
  memberId: Yup.string().required("A member is required."),
});