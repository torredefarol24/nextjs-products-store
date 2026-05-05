"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

interface ThemeContextType {
	theme: Theme
	toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>("light")
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		const storedTheme = (localStorage.getItem("theme") as Theme) || "light"
		const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
		const activeTheme = storedTheme || (prefersDark ? "dark" : "light")

		// eslint-disable-next-line react-hooks/set-state-in-effect
		setTheme(activeTheme)
		document.documentElement.classList.toggle("dark", activeTheme === "dark")
		setMounted(true)
	}, [])

	const toggleTheme = () => {
		const newTheme = theme === "light" ? "dark" : "light"
		setTheme(newTheme)
		localStorage.setItem("theme", newTheme)
		document.documentElement.classList.toggle("dark", newTheme === "dark")
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
	)
}

export function useTheme() {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error("useTheme must be used within ThemeProvider")
	}
	return context
}
