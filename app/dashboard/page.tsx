import DashboardComponent from "@/components/dashboard/Dashboard"
import { getUserOrders } from "@/lib/orders"
import { getCurrentUser } from "@/utils/auth"
import { Metadata } from "next"

export const metadata: Metadata = {
	title: "Dashboard",
}

export default async function DashboardPage() {
	const user = await getCurrentUser()
	const orders = await getUserOrders(user?.id)
	return <DashboardComponent orders={orders} />
}
