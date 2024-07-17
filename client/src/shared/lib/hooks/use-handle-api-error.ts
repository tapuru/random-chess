import { useTranslations } from "next-intl";
import { ApiErrors, apiErrorSchema, isApiError } from "../api-helpers";

export const useHandleApiError = () => {
  const errorT = useTranslations("ApiErrors");
  const handleApiError = (
    error: unknown,
    callback: (message: string) => void
  ) => {
    if (isApiError(error)) {
      let message: string;
      const result = apiErrorSchema.safeParse(error.data.message);
      result.success
        ? (message = errorT(result.data))
        : (message = errorT(ApiErrors.UNEXPECTED));
      callback(message);
    } else {
      callback(errorT(ApiErrors.UNEXPECTED));
      console.log(error);
    }
  };
  return {
    handleApiError,
  };
};
