import { Auth, Login } from "@/types/data";
import { AxiosInstance } from "axios";

export default function createAuthApi(http: AxiosInstance){
	return {
		async check(){
			const response = await http.get<Auth>('auth/check');
			return response.data;
		},
		async login(form: { login: string, password: string }){
			const response = await http.post<Login>('auth/login', form);
			return response.data;
		}
	}
}