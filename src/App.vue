<script lang="ts" setup>
import useStore from '@/composables/useStore'

const authStore = useStore('auth');
const someStore = useStore('some');


</script>

<template>
	<header>
		<div class="container">
			<AppLink :to="{ name: 'home' }" exact-active-class="text-danger">Home</AppLink> |
			<AppLink :to="{ name: 'posts' }" exact-active-class="text-danger">Blog</AppLink> | 
			<AppLink v-if="!authStore.isAuth" :to="{ name: 'auth.login' }" exact-active-class="text-danger">Login</AppLink>
			<AppLink v-else :to="{ name: 'office.dashboard' }">Office ({{ authStore.user?.login }})</AppLink>
		</div>
	</header>
	<div class="container">
		<Suspense>
			<RouterView />
		</Suspense>
	</div>
	<footer>
		<div class="container">
			<button type="button" @click="someStore.inc">{{ someStore.count }}</button>
		</div>
	</footer>
</template> 