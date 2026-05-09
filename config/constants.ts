export const ENDPOINTS = {
	products: "https://dummyjson.com/products",
	categories: "https://dummyjson.com/products/categories",
	productsByCategory: (category: string) =>
		`https://dummyjson.com/products/category/${category}`,
	getUserOrders: "/api/orders/user",
}

export const TABLES = {
	users: "users",
	orders: "orders",
}

export const APP_ROUTES = {
	home: "/",
	products: "/products",
	contact: "/contact",
	category: "/category",
	orders: "/orders",
	productDetail: (id: number) => `/products/${id}`,
	productByCategory: (category: string) => `/products/category/${category}`,
	profile: "/profile",
	login: "/login",
	signup: "/signup",
}

export const APP_INTERNAL_APIS = {
	login: "/api/auth/login",
	logout: "/api/auth/logout",
	updateProfile: "/api/auth/update",
	changePassword: "/api/auth/change-password",
	getUser: "/api/auth/user",
	getOrders: "/api/orders/retrieve",
	createOrder: "/api/orders/create",
}
