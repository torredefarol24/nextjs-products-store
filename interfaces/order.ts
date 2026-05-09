export interface IOrder {
	id: string
	userId: string
	product: {
		id: number
		title: string
		thumbnail: string
		price: number
	}
	total: number
	status?: string
	createdAt: Date
}

export interface IOrderData {
	orderData: {
		productId: number
		total: number
	}
	productData: {
		title: string
		thumbnail: string
		price: number
	}
}

export interface IDeleteOrderModalProps {
	cancelDelete: () => void
	handleDeleteOrder: (orderId: string) => Promise<void>
	showDeleteConfirm: string | null
	deletingOrderId: string | null
}

export interface IOrderTableProps {
	orders: IOrder[]
	sortedOrders: IOrder[]
	deletingOrderId: string | null
	confirmDelete: (orderId: string) => void
}
