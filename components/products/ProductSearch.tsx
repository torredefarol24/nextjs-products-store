interface SearchProps {
	searchQuery: string
	onSearchChange: (query: string) => void
	placeholder?: string
}

export function ProductSearchComponent({
	searchQuery,
	onSearchChange,
	placeholder = "Search products...",
}: SearchProps) {
	return (
		<div className="relative">
			<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
				<svg
					className="w-4 h-4 theme-text-muted"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 20 20"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
					/>
				</svg>
			</div>
			<input
				type="search"
				value={searchQuery}
				onChange={(e) => onSearchChange(e.target.value)}
				placeholder={placeholder}
				className="block w-full rounded-2xl border theme-border theme-surface px-10 py-3 text-sm theme-text focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-theme-text-muted"
			/>
			{searchQuery && (
				<button
					type="button"
					onClick={() => onSearchChange("")}
					className="absolute inset-y-0 right-0 flex items-center pr-3 text-theme-text-muted hover:text-theme-text"
				>
					<svg
						className="w-4 h-4"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 14"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
						/>
					</svg>
				</button>
			)}
		</div>
	)
}
