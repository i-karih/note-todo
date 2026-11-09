<script setup lang="ts"></script>

<template>
	<div class="ui-modal-content">
		<slot />
	</div>
</template>

<style scoped lang="scss">
	.ui-modal-content {
		max-height: 100%;
		overflow: auto;
	}
</style>
