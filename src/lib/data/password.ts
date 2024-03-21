import * as Yup from "yup";

// TODO: make passwords require more security
export const validationSchema = Yup.object().shape({
  password: Yup.string().required("Current password is required."),
  newPassword: Yup.string().required("New password is required."),
});