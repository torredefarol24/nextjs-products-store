import OrdersListComponent from "@/components/orders/OrderList"
import { ROUTES } from "@/config/constants"
import { getUserOrders } from "@/lib/orders"
import { getCurrentUser } from "@/utils/auth"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
	title: "Orders",
}

export default async function OrdersPage() {
	const user = await getCurrentUser()

	if (!user) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50 theme-surface px-4 py-12 text-center">
				<p className="text-lg theme-text">You need to be signed in to view your profile.</p>
				<Link
					href={ROUTES.login}
					className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
				>
					Sign In
				</Link>
			</div>
		)
	}

	const orders = await getUserOrders(user.id)

	return <OrdersListComponent orders={orders} />
}
