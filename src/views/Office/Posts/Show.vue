<script lang="ts" setup>
	import useRouteInt from '@/composables/useRouteInt'
	import useApiRequest from '@/composables/useApiRequest'
	import useApi from '@/composables/useApi'
	import E404OrCritical from '@/components/Errors/E404OrCritical.vue'

	const api = useApi();
	const routeId = useRouteInt('id');
	const post = useApiRequest(api.posts.one, { skip: !routeId.valid }, routeId.value);
	await post.value.isReady;
	
	const comments = useApiRequest(
		api.posts.comments, 
		{ skip: post.value.fail }, 
		post.value.success ? post.value.data.id : 0
	);

	const images = useApiRequest(
		api.posts.images, 
		{ skip: post.value.fail }, 
		post.value.success ? post.value.data.id : 0
	);

	if(import.meta.env.SSR){
		await Promise.all([ comments.value.isReady, images.value.isReady ]);
	}
	
</script>

<template>
	<div class="alert alert-warning">Test text</div>
	<E404OrCritical v-if="post.fail" :code="post.failCode" />
	<div v-else-if="post.success">
		<h1>{{ post.data.title }}</h1>
		<hr />
		<div v-if="comments.success">
			{{ comments.data }}
		</div>
		<div v-if="images.success">
			{{ images.data }}
		</div>
	</div>
</template>