import { RequireAuth } from "@/features/auth";
import { HistoryPage } from "@/pages-components/history-page";

export default function Page() {
  return (
    <RequireAuth>
      <HistoryPage />
    </RequireAuth>
  );
}
