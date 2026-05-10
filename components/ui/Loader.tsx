interface LoaderProps {
	message?: string
	className?: string
	fullScreen?: boolean
}

export default function Loader({
	message = "Loading...",
	className = "",
	fullScreen = false,
}: LoaderProps) {
	return (
		<div
			className={`${fullScreen ? "min-h-screen flex items-center justify-center" : "flex items-center justify-center"} ${className}`}
		>
			<div className="flex flex-col items-center gap-4 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-950/80">
				<div className="h-12 w-12 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin dark:border-slate-700 dark:border-t-blue-400" />
				<p className="text-sm font-medium theme-text invert">{message}</p>
			</div>
		</div>
	)
}
