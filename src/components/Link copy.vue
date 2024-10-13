<script lang="ts" generic="T extends keyof RoutesMap" setup>
	import { RoutesMap } from '@/router'
import { computed } from 'vue';
	import { RouterLinkProps } from 'vue-router'

	type LinkNewProps = {
		name: T,
		params: RoutesMap[T]
	}

	type LinkProps = Omit<RouterLinkProps, 'to'> & LinkNewProps;

	const props = defineProps<LinkProps>();

	const nativeProps = computed(() => {
		const { name, params, ...native } = props;
		return native;
	})
</script>

<template>
	<RouterLink :to="{ name: name as string, params: params as Record<string,string> }" v-bind="nativeProps">
		<slot></slot>
	</RouterLink>
</template>
