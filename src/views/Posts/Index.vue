<script lang="ts" setup>
import useApi from '@/composables/useApi';
import useApiRequest from '@/composables/useApiRequest';

const posts = useApiRequest(useApi().posts.all)

</script>

<template>
	<div>
		<h1>Blog</h1>
		<hr />
		<div v-if="posts.success" class="row">
			<div v-for="post in posts.data" class="col">
				<h2>{{ post.title }}</h2>
				<div><em>Create by {{ post.User.login }}</em></div>
				<AppLink :to="{ name: 'office.posts.show', params: { id: post.id } }">Read more</AppLink>
			</div>
		</div>
	</div>
</template>