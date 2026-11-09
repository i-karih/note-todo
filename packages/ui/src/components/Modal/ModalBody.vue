<script setup lang="ts">
	import { UICard } from '../Card'
</script>

<template>
	<div class="ui-modal-body">
		<UICard class="ui-modal-body__content text-body-m">
			<template #card>
				<slot />
			</template>
		</UICard>
	</div>
</template>

<style scoped lang="scss">
	.ui-modal-body {
		display: flex;

		&__content {
			--card-bg-color: var(--neutral-850);

			position: relative;
			max-width: var(--ui-modal-max-width);
			width: 100%;
			max-height: calc(100vh - 2 * var(--spacing-300));

			@supports (height: 100dvh) {
				max-height: calc(100dvh - 2 * var(--spacing-300));
			}

			display: flex;
			flex-direction: column;
			gap: var(--spacing-200);
		}
	}
</style>
