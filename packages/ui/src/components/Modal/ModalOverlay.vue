<script setup lang="ts"></script>

<template>
	<div class="ui-modal-overlay">
		<slot />
	</div>
</template>

<style scoped lang="scss">
	.ui-modal-overlay {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: var(--bg-modal-overlay);

		padding: var(--spacing-300);
	}
</style>
