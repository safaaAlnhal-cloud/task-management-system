import type { AxiosError } from "axios";

export const getErrorMessage = (
  err: unknown,
  fallbackMessage: string = "Something went wrong"
): string => {
  const error = err as AxiosError<{ message: string }>;

  return error?.response?.data?.message || fallbackMessage;
};