<script lang="ts" setup>
	import useApi from '@/composables/useApi';
	import { useRouter } from 'vue-router'
	import useForm from '@/composables/useForm'
	import { inject } from 'vue';
	import { PostInject } from './di';

	const post = inject(PostInject)!;

	const api = useApi();
	const router = useRouter();

	const { form, errors, notice, send, pending } = useForm(
		(obj: Parameters<typeof api.posts.save>[1]) => api.posts.save(post.value.id, obj), 
		post.value, 
		post => {
			router.push({ name: 'office.alt.show', params: { id: post.id }});
		})
</script>

<template>
	<div class="card">
		<form class="card-body">
			<h5 class="card-title">Enter to site</h5>
			<div class="mb-3">
				<label class="form-label">Url</label>
				<input v-model.trim="form.url" type="text" class="form-control">
				<p class="text-danger">{{ errors.url }}</p>
			</div>
			<div class="mb-3">
				<label class="form-label">Title</label>
				<input v-model.trim="form.title" type="text" class="form-control">
				<p class="text-danger">{{ errors.title }}</p>
			</div>
			<div class="mb-3">
				<label class="form-label">Content</label>
				<input v-model.trim="form.content" type="text" class="form-control">
				<p class="text-danger">{{ errors.content }}</p>
			</div>
			<button @click="send" :disabled="pending" type="button" class="btn btn-primary">Enter</button>
			<p v-if="notice" class="text-danger">{{ notice }}</p>
		</form>
	</div>
</template>