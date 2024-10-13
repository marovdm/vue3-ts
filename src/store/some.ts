import { defineStore, Pinia } from "pinia";
import { ref } from "vue";

export default function createSomeStore(pinia: Pinia){
	const useSomeStore = defineStore('some', () => {
		const count = ref(0);

		function inc(){
			count.value++;
		}
	
		return { count, inc };
	});
	
	return () => useSomeStore(pinia);
}