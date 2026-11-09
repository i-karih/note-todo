<script setup lang="ts"></script>

<template>
	<div class="ui-modal-footer">
		<slot />
	</div>
</template>

<style scoped lang="scss">
	.ui-modal-footer {
		display: flex;
		justify-content: flex-end;
		flex-wrap: wrap;
		gap: var(--spacing-200);
	}
</style>
