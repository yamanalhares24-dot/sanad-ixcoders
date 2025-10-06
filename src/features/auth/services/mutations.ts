// services/mutations.ts
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import AuthServices, {
  type AuthResult,
  type LoginFormInput,
  type SignUpFormInput,
} from "./api";

type ApiError = AxiosError<{ message?: string }>;

export function useSignUpMutation() {
  return useMutation<AuthResult, ApiError, SignUpFormInput>({
    mutationKey: ["auth", "signup"],
    mutationFn: (payload) => AuthServices.signUp(payload),
  });
}

export function useLoginMutation() {
  return useMutation<AuthResult, ApiError, LoginFormInput>({
    mutationKey: ["auth", "login"],
    mutationFn: (payload) => AuthServices.login(payload),
  });
}
