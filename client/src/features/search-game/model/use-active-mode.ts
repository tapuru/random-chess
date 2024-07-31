import { useAppSelector } from "@/shared/lib/hooks/redux-hooks";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { searchGameModel } from "./search-game-slice";

export const useActiveMode = () => {
  const searchParams = useSearchParams();
  //useRouter and usePathname must be imported from next/navigation here to prevent weird behaviour
  const router = useRouter();
  const pathname = usePathname();
  const activeMode = useAppSelector(searchGameModel.selectActiveMode);

  if (!searchParams?.get("mode")) {
    router.replace(`${pathname}?mode=${activeMode ?? "classical"}`);
    return false;
  }

  return true;
};
