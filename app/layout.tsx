import { FooterComponent } from "@/components/footer/Footer"
import { HeaderComponent } from "@/components/header/Header"
import { ErrorBoundary } from "@/components/ui/ErrorBoundary"
import { ToastProvider } from "@/components/ui/Toast"
import { AuthProvider } from "@/contexts/auth"
import ThemeProvider from "@/contexts/themes"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
	subsets: ["latin"],
	variable: "--font-geist-sans",
})

export const metadata: Metadata = {
	title: "Kyle's Store",
	description: "Products Site with Nextjs",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className={`${geistSans.variable} h-full`}>
			<body className="min-h-screen antialiased">
				<ErrorBoundary>
					<ThemeProvider>
						<ToastProvider>
							<AuthProvider>
								<div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
									<HeaderComponent />
									<main className="flex-1 px-2 py-4 sm:px-0">{children}</main>
									<FooterComponent />
								</div>
							</AuthProvider>
						</ToastProvider>
					</ThemeProvider>
				</ErrorBoundary>
			</body>
		</html>
	)
}
