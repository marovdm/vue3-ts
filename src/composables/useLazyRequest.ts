import { ref } from "vue"

type ApiRequestIdle = {
	idle: true
	pending: false,
	success: false,
	fail: false
}

type ApiRequestPending = {
	idle: false,
	pending: true,
	success: false,
	fail: false
}

type ApiRequestSuccess<T> = {
	idle: false,
	pending: false,
	success: true,
	fail: false,
	data: T
}

type ApiRequestFail = {
	idle: false,
	pending: false,
	success: false,
	fail: true,
	error: Error
}

type ApiRequestResult<T> = ApiRequestIdle | ApiRequestPending | ApiRequestSuccess<T> | ApiRequestFail;

export default function useLazyRequest<T extends (...args: any[]) => Promise<any>>(fn: T)
{
	const res = ref<ApiRequestResult<Awaited<ReturnType<T>>>>({
		idle: true,
		pending: false,
		success: false,
		fail: false
	});
	
	function run(...args: Parameters<T>){
		res.value = {
			idle: false,
			pending: true,
			success: false,
			fail: false
		}

		fn(...args)
			.then(data => {
				res.value = {
					idle: false,
					pending: false,
					success: true,
					fail: false,
					data
				}
			})
			.catch((e: unknown) => {
				res.value = {
					idle: false,
					pending: false,
					success: false,
					fail: true,
					error: e instanceof Error ? e : new Error('unknown error')
				}
			})
	}
	
	return [ res, run ] as const;
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