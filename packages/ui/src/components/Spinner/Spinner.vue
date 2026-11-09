<script setup lang="ts">
	import type { SpinnerProps } from './Spinner.types'

	const { size = 'medium' } = defineProps<SpinnerProps>()
</script>

<template>
	<span
		:class="['ui-spinner', `ui-spinner--${size}`]"
		role="status"
		aria-label="Загрузка"
	>
		<span class="ui-spinner__circle" aria-hidden="true" />
	</span>
</template>

<style scoped lang="scss">
	.ui-spinner {
		--spinner-size: 24px;
		--spinner-border: 2px;

		display: inline-flex;
		align-items: center;
		justify-content: center;

		&--small {
			--spinner-size: 16px;
			--spinner-border: 2px;
		}

		&--medium {
			--spinner-size: 24px;
			--spinner-border: 3px;
		}

		&--large {
			--spinner-size: 32px;
			--spinner-border: 3px;
		}

		&__circle {
			width: var(--spinner-size);
			height: var(--spinner-size);
			border: var(--spinner-border) solid var(--border-default);
			border-top-color: var(--text-primary);
			border-radius: 50%;
			animation: spin 0.8s linear infinite;
		}
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ui-spinner__circle {
			animation: none;
		}
	}
</style>