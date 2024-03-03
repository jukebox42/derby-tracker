import * as Yup from "yup";

export const authValidationSchema = Yup.object().shape({
  email: Yup.string().required("Email Address is required.").email("Email Address is invalid."),
  password: Yup.string().required("Password is required"),
});