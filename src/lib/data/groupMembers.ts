import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  groupId: Yup.string().required("A group is required."),
});