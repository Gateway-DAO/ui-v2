import { ThemeProvider } from "@/theme";
import { PropsWithChildren } from "react";

type Props = {
    isAuthPage?: boolean;
  }
  
  export function DashboardApp({ children, isAuthPage }: PropsWithChildren<Props>) {
    return     <ThemeProvider>
        {children}
    </ThemeProvider>;

}