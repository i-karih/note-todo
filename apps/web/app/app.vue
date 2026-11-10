<script setup lang="ts">
	import ConfirmContainer from '~/components/ConfirmContainer.vue'
</script>

<template>
	<div class="wrapper">
		<NuxtPage />
		<ConfirmContainer />
	</div>
</template>

<style scoped lang="scss">
	.wrapper {
		min-height: 100vh;
		@supports (min-height: 100dvh) {
			min-height: 100dvh;
		}
	}
</style>
