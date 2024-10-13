import { AxiosInstance } from "axios";

export function initHttpTokens(http: AxiosInstance, storage: Storage){
	http.interceptors.request.use(config => {
		const token = storage.getItem('AUTH_TOKEN');

		if(token){
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	})
}