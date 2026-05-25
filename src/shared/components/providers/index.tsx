"use client";

import { checkAuth } from "@/shared/lib/check-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { retry: 1 } },
      }),
  );
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Providers;
