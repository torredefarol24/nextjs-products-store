import { IDeleteOrderModalProps } from "@/interfaces/order"

export function DeleteOrderModal({
	cancelDelete,
	handleDeleteOrder,
	showDeleteConfirm,
	deletingOrderId,
}: IDeleteOrderModalProps) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
				<div className="flex items-center gap-4 mb-4">
					<div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center flex-shrink-0">
						<svg
							className="w-6 h-6 text-red-600 dark:text-red-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
							/>
						</svg>
					</div>
					<div>
						<h3 className="text-lg font-semibold theme-text">Delete Order</h3>
						<p className="text-sm theme-text-muted">This action cannot be undone.</p>
					</div>
				</div>
				<p className="theme-text-muted mb-6">
					Are you sure you want to delete this order? This will permanently remove the order
					from your account.
				</p>
				<div className="flex gap-3">
					<button
						onClick={cancelDelete}
						className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 theme-text rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
					>
						Cancel
					</button>
					<button
						onClick={() => handleDeleteOrder(showDeleteConfirm as string)}
						disabled={deletingOrderId === showDeleteConfirm}
						className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2"
					>
						{deletingOrderId === showDeleteConfirm ? (
							<>
								<svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
									<circle
										className="opacity-25"
										cx="12"
										cy="12"
										r="10"
										stroke="currentColor"
										strokeWidth="4"
									></circle>
									<path
										className="opacity-75"
										fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
									></path>
								</svg>
								Deleting...
							</>
						) : (
							"Delete Order"
						)}
					</button>
				</div>
			</div>
		</div>
	)
}
