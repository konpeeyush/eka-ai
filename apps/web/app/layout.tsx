import { Geist_Mono, Inter } from "next/font/google"

import "@workspace/ui/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils";
import { Providers } from "@/components/providers";
import { ClerkProvider } from '@clerk/nextjs'
import ConvexClientProvider from "@/components/clerk-provider";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <ThemeProvider>
          <Providers>
            <ClerkProvider>
            <ConvexClientProvider>
              {children}
            </ConvexClientProvider>
            </ClerkProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
