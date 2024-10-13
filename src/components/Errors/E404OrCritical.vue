<script lang="ts" setup>
	import E404 from './E404.vue'

	defineProps<{
		code?: number
	}>();
</script>

<template>
	<E404 v-if="code == 404" />
	<div v-else class="alert alert-danger">Oopps, etc</div>
</template>
