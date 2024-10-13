<script lang="ts" setup>
import useApi from '@/composables/useApi';
import useApiRequest from '@/composables/useApiRequest';

const posts = useApiRequest(useApi().posts.my)
</script>

<template>
	<div>
		<h1>Your posts</h1>
		<hr>
		<div v-if="posts.success" class="row">
			<div v-for="post in posts.data" class="col">
				<h2>{{ post.title }}</h2>
				<AppLink :to="{ name: 'office.alt.show', params: { id: post.id } }">Read more</AppLink>
			</div>
		</div>
	</div>
</template>