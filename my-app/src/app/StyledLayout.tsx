"use server"
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from "@/styles/theme";

interface StyleProps {
    children: React.ReactNode;
}

export default async function StyleLayout ({ children }: StyleProps) {
    return (
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
    )
}