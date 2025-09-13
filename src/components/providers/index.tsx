"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { getQueryClient } from "~/configs/query";

const client = getQueryClient();

export function Providers({ children }: React.PropsWithChildren) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
