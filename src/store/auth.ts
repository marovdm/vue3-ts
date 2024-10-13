import { defineStore, Pinia } from "pinia";
import { computed, ref } from "vue";

export default function createAuthStore(pinia: Pinia){
	const useAuthStore = defineStore('auth', () => {
		const user = ref<TUser | null>(null);
		const isAuth = computed(() => user.value !== null);
	
		function setUser(newUser: TUser){
			user.value = newUser;
		}
	
		return { user, isAuth, setUser };
	});
	
	return () => useAuthStore(pinia);
}

type TUser = {
	id: number,
	login: string
}