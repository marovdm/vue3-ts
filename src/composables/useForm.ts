import { Error422 } from "@/types/data";
import { AxiosError } from "axios";
import { reactive, ref } from "vue";

export default function useForm<
	TFormData extends Record<string,unknown>, 
	TApiResult
>(
	apiFn: (args: TFormData) => Promise<TApiResult>, 
	formData: TFormData, 
	onSuccess: (args: TApiResult) => void
){ 
	const form = reactive(formData);
	const errors = ref<Record<string,string>>({});
	const notice = ref<string | null>(null);
	const pending = ref(false);

	async function send(){
		errors.value = {};
		notice.value = null;
		pending.value = true;
		
		try{
			const res = await apiFn(formData);
			onSuccess(res);
		}
		catch(e){
			if(e instanceof AxiosError && e.response?.status == 422){
				const backErrros = e.response.data as Error422[];
				
				backErrros.forEach(([key, type, args]) => {
					errors.value[key] = type + args;
				})
			}
			else{
				notice.value = 'Unknwon error';
				console.log(e);
			}
		}
		finally{
			pending.value = false;
		}
	}
	
	return {
		form,
		errors,
		notice,
		send,
		pending
	}
}