import { inject } from 'vue'
import { ApiInjectKey } from '@/api/index'

export default function useApi(){
	const api = inject(ApiInjectKey);

	if(api === undefined){
		throw new Error('some moron run application without Api provide method');
	}

	return api;
}