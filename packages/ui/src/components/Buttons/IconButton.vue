<script setup lang="ts">
	import type { IconButtonProps } from './IconButton.types'

	import { UIIcon } from '../Icon'
	import InlineButton from './InlineButton.vue'
	import Primitive from "./Primitive.vue";

	const {
		name,
		size = 'small',
		to = '',
		href = '',
		as,
		type,
		variant = 'secondary',
		disabled = false,
	} = defineProps<IconButtonProps>()
</script>

<template>
	<Primitive
		:class="[
			'ui-icon-button',
			`ui-icon-button--${variant}`,
		]"
		:variant="variant"
		:to="to"
		:href="href"
		:as="as"
		:type="type"
		:disabled="disabled"
	>
		<UIIcon :size="size" :name="name" />
	</Primitive>
</template>

<style scoped lang="scss">
	.ui-icon-button {
		padding: var(--spacing-100);
		border-radius: var(--corner-8);
		color: var(--text-primary);
		transition:
			background-color 0.3s,
			color 0.3s;

		&--primary {
			background-color: var(--bg-primary);
			&:hover {
				@media (hover: hover) {
					background-color: var(--bg-primary-hover);
				}
			}
			&:active {
				background-color: var(--bg-primary-active);
			}
		}

		&--secondary {
			&:hover {
				@media (hover: hover) {
					background-color: var(--bg-hover-overlay);
				}
			}

			&:active {
				background-color: var(--bg-active);
			}
		}

	}
</style>
