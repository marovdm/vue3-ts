import { Post, WithUser } from "@/types/data";
import { AxiosInstance } from "axios";

export default function createProductsApi(http: AxiosInstance){
	return {
		async all(){
			const response = await http.get<Array<WithUser<Post>>>('posts');
			return response.data;
		},
		async one(id: number){
			const response = await http.get<Post>(`posts/${id}`);
			return response.data;
		},
		async my(){
			const response = await http.get<Post[]>('posts/my');
			return response.data;
		},
		async add(form: { url: string, title: string, content: string }){
			const response = await http.post<Post>('posts', form);
			return response.data;
		},
		async save(id: number, form: { url: string, title: string, content: string }){
			const response = await http.put<Post>(`posts/${id}`, form);
			return response.data;
		},
		async comments(id: number){
			const response = await http.get<Comment[]>(`comments/posts/${id}`);
			return response.data;
		},
		async images(id: number){
			const response = await http.get<Comment[]>(`images/posts/${id}`);
			return response.data;
		}
	}
}