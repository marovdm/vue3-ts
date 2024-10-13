<script lang="ts" setup>
import { AxiosError } from 'axios'
import useApi from '@/composables/useApi';
import { ref, reactive } from 'vue';
import { Error422 } from '@/types/data'

const form = reactive({
	login: '',
	password: ''
});

const errors = ref<Record<string,string>>({});
const notice = ref<string | null>(null);

const login = useApi().auth.login;

async function send(){
	try{
		errors.value = {};
		notice.value = null;
		const res = await login(form);
		localStorage.setItem('AUTH_TOKEN', res.token);
		document.location = '/office/dashboard';

		// of course we can redirect based on vue router
		// user -> store
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
		}
	}
}
</script>

<template>
	<div class="card">
		<form class="card-body">
			<h5 class="card-title">Enter to site</h5>
			<div class="mb-3">
				<label for="inp-username" class="form-label">Login</label>
				<input v-model.trim="form.login" type="text" name="login" class="form-control" id="inp-username">
				<p class="text-danger">{{ errors.login }}</p>
			</div>
			<div class="mb-3">
				<label for="inp-password" class="form-label">Password</label>
				<input v-model.trim="form.password" type="password" name="password" class="form-control" id="inp-password">
				<p class="text-danger">{{ errors.password }}</p>
			</div>
			<button @click="send" type="button" class="btn btn-primary">Enter</button>
			<p v-if="notice" class="text-danger">{{ notice }}</p>
		</form>
	</div>
</template>