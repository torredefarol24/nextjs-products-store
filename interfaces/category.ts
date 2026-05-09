export interface ICategory {
	categoryId: number
	name: string
	categName: string
}

export interface ICategoryDetailComponentProps {
	categoryId: number
}

export interface IProductByCategoryPageProps {
	params: {
		categName: string
	}
}
