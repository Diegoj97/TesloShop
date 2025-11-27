import { ProductUser } from "../../auth/interfece/user.interface";


export interface ProductResponse {
	id: string;
	title: string;
	price: number;
	description: string;
	slug: string;
	stock: number;
	sizes: string[];
	gender: string;
	tags: string[];
	images: string[];
	user: ProductUser;
}

