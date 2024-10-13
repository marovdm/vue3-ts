import axios from 'axios'

export default function createHttpPlugin(baseURL: string){
	const http = axios.create({
		baseURL
	});

	// some interceptors maybe, etc

	return http;
}