<script setup lang="ts">
	import type { ButtonSlots, InlineButtonProps } from './Buttons.types'

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
		underline = false,
	} = defineProps<InlineButtonProps>()

	const slots = defineSlots<ButtonSlots>()
</script>

<template>
	<Primitive
		:as="as"
		class="ui-inline-button"
		:class="[
			`ui-inline-button--${variant}`,
			`ui-inline-button--${size}`,
			{
				['ui-inline-button--underline']: underline,
			},
		]"
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
	.ui-inline-button {
		display: inline-flex;
		transition: color 0.3s;
		font-weight: var(--typography-button-weight);
		line-height: var(--typography-inline-button-line-height);
		border-radius: var(--corner-12);
		padding: var(--spacing-0) var(--spacing-50);

		&--primary {
			color: var(--text-inline-button-primary);

			&:hover {
				@media (hover: hover) {
					color: var(--text-inline-button-primary-hover);
				}
			}

			&:active {
				color: var(--text-inline-button-primary-pressed);
			}

			&:focus-visible {
				outline: var(--border-2) solid var(--border-focus);
				outline-offset: var(--spacing-25);
			}
		}

		&--secondary {
			color: var(--text-inline-button-secondary);

			&:hover {
				@media (hover: hover) {
					color: var(--text-inline-button-secondary-hover);
				}
			}

			&:active {
				color: var(--text-inline-button-secondary-pressed);
			}

			&:focus-visible {
				outline: var(--border-2) solid var(--primary-border-focus);
				outline-offset: var(--spacing-25);
			}
		}

		&--underline {
			text-decoration: underline;
			text-underline-offset: var(--spacing-50);
		}

		&--large {
			font-size: var(--typography-button-l-size);
		}

		&--medium {
			font-size: var(--typography-button-m-size);
		}

		&--small {
			font-size: var(--typography-button-s-size);
		}
	}
</style>
