<script lang="ts" setup>
	function tryLogout(){
		localStorage.removeItem('AUTH_TOKEN');
		document.location = '/';
	}
</script>

<template>
	<div>
		<h1>Logout</h1>
		<button @click="tryLogout" type="button">Exit now</button>
	</div>
</template>