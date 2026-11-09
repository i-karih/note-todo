<template>
	<div class="wrapper">
		<NuxtPage />
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
