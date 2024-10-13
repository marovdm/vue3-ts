import { AxiosInstance } from "axios";
import createPostsApi from "./posts";
import createAuthApi from "./auth";
import { InjectionKey } from "vue";

export default function createApi(http: AxiosInstance){
	return {
		posts: createPostsApi(http),
		auth: createAuthApi(http)
	}
}

export type TApi = ReturnType<typeof createApi>;

export const ApiInjectKey = Symbol() as InjectionKey<TApi>