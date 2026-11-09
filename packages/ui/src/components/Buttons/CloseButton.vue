<script setup lang="ts">
	import type { ButtonSize } from './Buttons.types'

	import Icon from '../Icons/Icon.vue'
	import InlineButton from './InlineButton.vue'

	const { size = 'small' } = defineProps<{ size?: ButtonSize }>()
</script>

<template>
	<InlineButton class="ui-button-close" variant="secondary">
		<Icon :size="size" name="X" />
	</InlineButton>
</template>

<style scoped lang="scss">
	.ui-button-close {
		padding: var(--spacing-100);
		border-radius: var(--corner-8);
		transition:
			background-color 0.3s,
			color 0.3s;
		&:hover {
			@media (hover: hover) {
				background-color: var(--bg-hover-overlay);
			}
		}
	}
</style>
