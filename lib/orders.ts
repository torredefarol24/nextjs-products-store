"use server"

import { TABLES } from "@/config/constants"
import { DatabaseError, ValidationError } from "@/config/errors"
import { IOrderData } from "@/interfaces/order"
import { withErrorHandling } from "@/utils/errorHandler"
import { ObjectId } from "mongodb"
import { clientPromise, dbName } from "../config/mongodb"
import { getUserById } from "./auth"

export async function getUserOrders(userId: string) {
	return withErrorHandling(async () => {
		if (!userId?.trim()) {
			throw new ValidationError("User ID is required")
		}

		const client = await clientPromise
		const db = client.db(dbName)

		const user = await getUserById(userId)
		if (!user) {
			throw new ValidationError("User not found")
		}

		const orders = await db.collection(TABLES.orders).find({ userId: user.id }).toArray()
		const ordersWithProducts = orders.map((order) => ({
			id: order._id.toString(),
			userId: order.userId,
			total: order.total,
			status: order.status,
			createdAt: order.createdAt,
			product: {
				id: order.productId,
				title: order.productTitle,
				thumbnail: order.productThumbnail,
				price: order.productPrice,
			},
		}))

		return ordersWithProducts
	}, "getUserOrders")
}

export async function createOrder(userId: string, data: IOrderData) {
	return withErrorHandling(async () => {
		if (!userId?.trim()) {
			throw new ValidationError("User ID is required")
		}
		if (
			!data ||
			!data.orderData?.productId ||
			!data.orderData?.total ||
			!data.productData?.title ||
			!data.productData?.price
		) {
			throw new ValidationError("Invalid order data")
		}

		const client = await clientPromise
		const db = client.db(dbName)

		const user = await getUserById(userId)
		if (!user) {
			throw new ValidationError("User not found")
		}

		const newOrder = {
			userId: user.id,
			productId: data.orderData.productId,
			total: data.orderData.total,
			productTitle: data.productData.title,
			productThumbnail: data.productData.thumbnail,
			productPrice: data.productData.price,
			status: "pending",
			createdAt: new Date(),
		}

		const result = await db.collection(TABLES.orders).insertOne(newOrder)

		if (!result.acknowledged) {
			throw new DatabaseError("Failed to create order")
		}

		return {
			orderId: result.insertedId.toString(),
			...newOrder,
		}
	}, "createOrder")
}

export async function deleteOrder(userId: string, orderId: string) {
	return withErrorHandling(async () => {
		if (!userId?.trim()) {
			throw new ValidationError("User ID is required")
		}
		if (!orderId?.trim()) {
			throw new ValidationError("Order ID is required")
		}

		const client = await clientPromise
		const db = client.db(dbName)

		const user = await getUserById(userId)
		if (!user) {
			throw new ValidationError("User not found")
		}

		const result = await db.collection(TABLES.orders).deleteOne({
			_id: new ObjectId(orderId),
			userId: user.id,
		})

		if (result.deletedCount === 0) {
			throw new ValidationError("Order not found or already deleted")
		}

		return { success: true }
	}, "deleteOrder")
}
