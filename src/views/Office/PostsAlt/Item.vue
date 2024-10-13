<script lang="ts" setup>
	import useRouteInt from '@/composables/useRouteInt'
	import useApiRequest from '@/composables/useApiRequest'
	import useApi from '@/composables/useApi'
	import E404OrCritical from '@/components/Errors/E404OrCritical.vue'
	import { provide, computed } from 'vue';
	import { PostInject } from './di';
	import { Post } from '@/types/data';

	const api = useApi();
	const routeId = useRouteInt('id');
	const post = useApiRequest(api.posts.one, { skip: !routeId.valid }, routeId.value);
	const item = computed(() => post.value.success ? post.value.data : null as unknown as Post );
	// в 25 строку мы попадаем только при success, т.е. inject null тупо невозможен
	
	provide(PostInject, item);

</script>

<template>
	<div v-if="post.pending">
		Loading
	</div>
	<E404OrCritical v-else-if="post.fail" :code="post.failCode" />
	<RouterView v-else></RouterView>
</template>