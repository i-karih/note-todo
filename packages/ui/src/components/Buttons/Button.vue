<script setup lang="ts">
	import type { ButtonProps, ButtonSlots } from './Buttons.types'

	import Primitive from './Primitive.vue'

	const {
		as,
		size = 'large',
		variant = 'primary',
		// TODO(i18n)
		loadingText = 'Загрузка...',
		loading = false,
		disabled = false,
		to = '',
		href = '',
	} = defineProps<ButtonProps>()

	const slots = defineSlots<ButtonSlots>()
</script>

<template>
	<Primitive
		:as="as"
		:class="[`ui-button--${variant}`, `ui-button--${size}`]"
		:disabled="disabled"
		:loading="loading"
		:loading-text="loadingText"
		:href="href"
		:to="to"
	>
		<slot v-if="slots.left" name="left" />
		<slot />
		<slot v-if="slots.right" name="right" />
	</Primitive>
</template>

<style scoped lang="scss">
	.ui-button {
		$self: &;
		color: var(--text-primary);
		transition:
			background-color 0.3s,
			color 0.3s,
			border-color 0.3s;
		border: var(--border-1) solid transparent;
		border-radius: var(--corner-12);

		&--primary {
			background-color: var(--bg-primary);

			&:hover:not(#{$self}--disabled) {
				@media (hover: hover) {
					background-color: var(--bg-primary-hover);
				}
			}

			&:active:not(#{$self}--disabled) {
				background-color: var(--bg-primary-active);
			}

			&:focus-visible:not(#{$self}--disabled) {
				outline: var(--border-2) solid var(--primary-border-focus);
				outline-offset: var(--spacing-25);
			}
		}

		&--secondary {
			border-color: var(--border-default);

			&:hover:not(#{$self}--disabled) {
				@media (hover: hover) {
					background-color: var(--bg-hover);
				}
			}

			&:active:not(#{$self}--disabled) {
				background-color: var(--bg-active);
			}

			&:focus-visible:not(#{$self}--disabled) {
				outline: var(--border-2) solid var(--border-focus);
				outline-offset: var(--spacing-25);
			}
		}

		&--large {
			font-size: var(--typography-button-l-size);
			line-height: var(--typography-button-line-height);
			font-weight: var(--typography-button-l-weight);
			padding: var(--spacing-150) var(--spacing-200);
		}

		&--medium {
			font-size: var(--typography-button-m-size);
			line-height: var(--typography-button-line-height);
			font-weight: var(--typography-button-weight);
			padding: var(--spacing-150) var(--spacing-200);
		}
		&--small {
			font-size: var(--typography-button-s-size);
			line-height: var(--typography-button-line-height);
			font-weight: var(--typography-button-weight);
			padding: var(--spacing-100) var(--spacing-150);
		}
	}
</style>
