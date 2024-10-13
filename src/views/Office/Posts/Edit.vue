<script lang="ts" setup>
import useApi from '@/composables/useApi';
import useRouteInt from '@/composables/useRouteInt'
import useApiRequest from '@/composables/useApiRequest'
import E404OrCritical from '@/components/Errors/E404OrCritical.vue'
import EditForm from '@/components/Posts/EditForm.vue'

const api = useApi();
const routeId = useRouteInt('id');
const post = useApiRequest(api.posts.one, { skip: !routeId.valid }, routeId.value);
</script>

<template>
	<EditForm v-if="post.success" :post="post.data" />
	<E404OrCritical v-else-if="post.fail" :code="post.failCode" />
</template>