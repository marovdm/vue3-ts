<script lang="ts" generic="T extends keyof RoutesMap" setup>
	import { RoutesMap } from '@/router'
	import { computed } from 'vue';
	import { RouteLocationNamedRaw, RouterLinkProps } from 'vue-router'

	type BuildToProp<T extends keyof RoutesMap> = 
		RoutesMap[T] extends Record<string,never>
			? { name: T }
			: {
				name: T,
				params: RoutesMap[T]
			}

	type LinkNewProps = {
		to: Omit<RouteLocationNamedRaw, 'name' | 'params'> & BuildToProp<T>
	}

	type LinkProps = Omit<RouterLinkProps, 'to'> & LinkNewProps;

	const props = defineProps<LinkProps>();

	const nativeProps = computed(() => {
		const { to, ...native } = props;
		return native;
	})
</script>

<template>
	<RouterLink :to="<RouteLocationNamedRaw>to" v-bind="nativeProps">
		<slot></slot>
	</RouterLink>
</template>
