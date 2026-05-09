import OrdersListComponent from "@/components/orders/OrderList"
import { getUserOrders } from "@/lib/orders"
import { getCurrentUser } from "@/utils/auth"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Orders",
}

export default async function OrdersPage() {
	const user = await getCurrentUser()
	const orders = await getUserOrders(user?.id)
	return <OrdersListComponent orders={orders} />
}
