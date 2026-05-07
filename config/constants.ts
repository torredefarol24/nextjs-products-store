export const ENDPOINTS = {
	products: "https://dummyjson.com/products",
}

export const TABLES = {
	users: "users",
}

export const APP_ROUTES = {
	home: "/",
	products: "/products",
	contact: "/contact",
	category: "/category",
	categoryDetail: (id: number) => `/category/${id}`,
	productDetail: (id: number) => `/products/${id}`,
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
}
