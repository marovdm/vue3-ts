import { inject } from 'vue'
import { StoreInjectKey, StoreInstance } from '@/store';

export default function useStore<T extends keyof StoreInstance>(name: T)
{
	const stores = inject(StoreInjectKey);

	if(stores === undefined){
		throw new Error('some moron run application without Store provide method');
	}

	return stores[name]() as ReturnType<StoreInstance[T]>;
}