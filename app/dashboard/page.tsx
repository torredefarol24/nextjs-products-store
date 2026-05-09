import DashboardComponent from "@/components/dashboard/Dashboard"
import { getCurrentUser } from "@/lib/auth"
import { getUserOrders } from "@/lib/orders"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Dashboard",
}

export default async function DashboardPage() {
	const user = await getCurrentUser()
	const orders = await getUserOrders(user?.id)
	return <DashboardComponent orders={orders} />
}
