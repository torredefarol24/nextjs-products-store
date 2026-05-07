export interface ICategory {
	categoryId: number
	name: string
	count: number
	subHeading?: string
}

export interface ICategoryDetailComponentProps {
	categoryId: number
}

export interface ICategoryPageProps {
	params: {
		id: string
	}
}
