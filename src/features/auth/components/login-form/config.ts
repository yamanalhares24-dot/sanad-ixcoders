// import { object, string, number, date, InferType } from "yup";
import * as yup from "yup";
import type { LoginFormInput } from "./index";

let loginFormSchemaValidation: yup.ObjectSchema<LoginFormInput> = yup.object({
  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(250, "Password cannot exceed 250 characters"),
});

loginFormSchemaValidation = loginFormSchemaValidation.required();

export { loginFormSchemaValidation };
