<script lang="ts" setup>
import useApi from '@/composables/useApi';
import useApiRequest from '@/composables/useApiRequest';
import { inject } from 'vue';
import { PostInject } from './di';

	const post = inject(PostInject)!;
	const api = useApi();
	
	const comments = useApiRequest(api.posts.comments, {}, post.value.id);
	const images = useApiRequest(api.posts.images, {}, post.value.id);

	if(import.meta.env.SSR){
		await Promise.all([ comments.value.isReady, images.value.isReady ]);
	}
	
</script>

<template>
	<div>
		<h1>{{ post.title }}</h1>
		<hr />
		<div v-if="comments.success">
			{{ comments.data }}
		</div>
		<div v-if="images.success">
			{{ images.data }}
		</div>
	</div>
</template>