export const TABLES = {
	users: "users",
	orders: "orders",
}

export const ROUTES = {
	home: "/",
	products: "/products",
	contact: "/contact",
	category: "/category",
	orders: "/orders",
	dashboard: "/dashboard",
	productDetail: (id: number) => `/products/${id}`,
	productByCategory: (category: string) => `/products/category/${category}`,
	settings: "/settings",
	login: "/login",
	signup: "/signup",
}

export const APIS = {
	INTERNAL: {
		login: "/api/auth/login",
		logout: "/api/auth/logout",
		updateProfile: "/api/auth/update",
		changePassword: "/api/auth/change-password",
		getUser: "/api/auth/user",
		getOrders: "/api/orders/retrieve",
		createOrder: "/api/orders/create",
		getProducts: "/api/products/fetch",
	},
	ENDPOINTS: {
		getProducts: "https://dummyjson.com/products",
		getProductById: (id: number) => `https://dummyjson.com/products/${id}`,
		getCategories: "https://dummyjson.com/products/categories",
		getProductsByCategory: (category: string) =>
			`https://dummyjson.com/products/category/${category}`,
	},
}
