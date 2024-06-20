"use client";

import { authActions, useLogoutMutation } from "@/entities/auth";
import { useRouter } from "@/shared/config/navigation";
import { useAppDispatch } from "@/shared/lib/hooks/redux-hooks";
import { AppText } from "@/shared/ui/app-text/app-text";

export const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await logout({}).unwrap();
      console.log(response);
      dispatch(authActions.logout());
    } catch (error) {
      //TODO: handle error
      console.log(error);
    }
  };
  return (
    <button onClick={handleLogout}>
      <AppText tag="span" color="text-500">
        Logout
      </AppText>
    </button>
  );
};
