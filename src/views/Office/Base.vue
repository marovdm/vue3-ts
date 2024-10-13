<script lang="ts" setup>

</script>

<template>
	<div class="row mt-3">
		<div class="col col-3">
			<ul class="list-group">
				<li class="list-group-item">
					<AppLink :to="{ name: 'office.dashboard' }">Dashboard</AppLink>
				</li>
				<li class="list-group-item">
					<AppLink :to="{ name: 'office.posts.index' }">Posts</AppLink>
				</li>
				<li class="list-group-item">
					<AppLink :to="{ name: 'office.alt.index' }">Posts Alt</AppLink>
				</li>
				<li class="list-group-item">
					<AppLink :to="{ name: 'office.logout' }">Logout</AppLink>
				</li>
			</ul>
		</div>
		<div class="col col-9">
			<RouterView />
		</div>
	</div>
</template>