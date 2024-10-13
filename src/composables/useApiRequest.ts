import { AxiosError } from "axios"
import { ref } from "vue"

type ApiRequestBase = {
	isReady: Promise<void>
}

type ApiRequestPending = ApiRequestBase & {
	pending: true,
	success: false,
	fail: false
}

type ApiRequestSuccess<T> = ApiRequestBase & {
	pending: false,
	success: true,
	fail: false,
	data: T
}

type ApiRequestFail = ApiRequestBase & {
	pending: false,
	success: false,
	fail: true,
	error: Error,
	failCode?: number,
}

type ApiRequestResult<T> = ApiRequestPending | ApiRequestSuccess<T> | ApiRequestFail;

type ApiRequestConfig = {
	skip?: boolean
}

export default function useApiRequest<T extends (...args: any[]) => Promise<any>>(
	fn: T,
	config: ApiRequestConfig = {},
	...args: Parameters<T>
)
{
	let isReadyResolver: ((value: void) => void) = () => {};

	const isReady = new Promise<void>(resolve => {
		isReadyResolver = resolve;
	});

	const res = ref<ApiRequestResult<Awaited<ReturnType<T>>>>({
		pending: true,
		success: false,
		fail: false,
		isReady
	});
	
	if(config.skip){
		res.value = {
			pending: false,
			success: false,
			fail: true,
			error: new Error('skipped'),
			failCode: 404,
			isReady
		}

		isReadyResolver();
	}
	else{
		fn(...args)
			.then(data => {
				res.value = {
					pending: false,
					success: true,
					fail: false,
					data,
					isReady
				}
			})
			.catch((e: unknown) => {
				res.value = {
					pending: false,
					success: false,
					fail: true,
					error: e instanceof Error ? e : new Error('unknown error'),
					failCode: e instanceof AxiosError ? e.response?.status ?? 0 : 0,
					isReady
				}
			})
			.finally(() => {
				isReadyResolver();
			})
	}
	
	return res;
}

/*
	into some component

	const res = useFetch<T>(url1);

	res.data -> T
	res.success
	res.pending
	res.fail
	res.error

	if(res.success){
		res.data -> T
	}

	if(res.fail){
		res.error
	}

*/

/*
https://faceprog.ru/reactcourseapi/products/index.php
https://faceprog.ru/reactcourseapi/products/index.php?delay
https://faceprog.ru/reactcourseapi/products/index.php?id=100&delay
*/