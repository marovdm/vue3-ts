import { Pinia } from "pinia";
import createAuthStore from "./auth";
import { InjectionKey } from "vue";
import createSomeStore from "./some";

export default function createStore(pinia: Pinia){
	const store = {
		auth: createAuthStore(pinia),
		some: createSomeStore(pinia)
	}

	return store;
}

export type StoreInstance = ReturnType<typeof createStore>
export const StoreInjectKey = Symbol() as InjectionKey<StoreInstance>