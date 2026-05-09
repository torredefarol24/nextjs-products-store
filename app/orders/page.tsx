"use client"

import OrdersListComponent from "@/components/orders/OrderList"
import { useAuth } from "@/contexts/auth"
import { IOrder } from "@/interfaces/order"
import { getUserOrders } from "@/lib/orders"
import { useEffect, useState } from "react"

export default function OrdersPage() {
	const { user } = useAuth()
	const [orders, setOrders] = useState<IOrder[]>([])

	useEffect(() => {
		document.title = "Orders"
	}, [])

	useEffect(() => {
		const fetchOrders = async () => {
			if (user) {
				const userOrders = await getUserOrders(user.id)
				setOrders(userOrders.orders)
			}
		}
		fetchOrders()
	}, [user, orders.length]) // Add orders.length to the dependency array to refetch when orders change

	return orders.length > 0 && <OrdersListComponent orders={orders} />
}
