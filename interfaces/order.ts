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
