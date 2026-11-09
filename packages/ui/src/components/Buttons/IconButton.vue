<script setup lang="ts">
	import Icon from '../Icon/Icon.vue'
	import  type { IconName, IconSize } from '../Icon/Icon.types'
	import InlineButton from './InlineButton.vue'

	const { size = 'small', name } = defineProps<{ size?: IconSize, name: IconName }>()
</script>

<template>
	<InlineButton class="ui-button-close" variant="secondary">
		<Icon :size="size" :name="name" />
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
