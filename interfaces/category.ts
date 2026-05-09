export interface ICategory {
	categoryId: number
	name: string
	slug: string
}

export interface ICategoryDetailComponentProps {
	categoryId: number
}

export interface IProductByCategoryPageProps {
	params: {
		slug: string
	}
}
