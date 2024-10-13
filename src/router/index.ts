import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import initRoutes from "./routes";

export default function createAppRouter(){
	const routes = initRoutes();

	const router = createRouter({
		routes,
		history: createWebHistory(import.meta.env.BASE_URL)
	});
	
	return router;
}

export type TRoutes = ReturnType<typeof initRoutes>;

type RoutesMapItemHelper<T extends RouteRecordRaw, Prefix extends string = ""> = 
	T extends { name: string } 
		? { name: T['name'], path: `${Prefix}${T['path']}` }
		: never

type RoutesMapHelper<T extends RouteRecordRaw, Prefix extends string = ""> = 
	T extends { children: RouteRecordRaw[] }
		? RoutesMapItemHelper<T, Prefix> | RoutesMapHelper<T['children'][number], `${Prefix}${T['path']}/`>
		: RoutesMapItemHelper<T, Prefix>

type RoutesPreMap = RoutesMapHelper<TRoutes[number]>

export type RoutesMap = {
	[ El in RoutesPreMap as El['name'] ]: InferParams<El['path']>
}

type InferParams<T extends string> = {
	[ K in InferHelper<`${T}/`> ]: string | number
}

type InferHelper<T extends string> = 
	T extends `${infer _R1}:${infer R2}/${infer R3}`
		? R2 | InferHelper<R3>
		: never
