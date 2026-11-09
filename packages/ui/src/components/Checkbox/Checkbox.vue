<script setup lang="ts">
	import type { CheckboxProps, CheckboxSlots } from './Checkbox.types'

	import CheckboxPrimitive from './CheckboxPrimitive.vue'
	import { UIIcon } from '../Icon'

	const model = defineModel<boolean>()

	const {
		disabled = false,
		label = '',
		error = false,
	} = defineProps<CheckboxProps>()

	const slots = defineSlots<CheckboxSlots>()
</script>

<template>
	<CheckboxPrimitive
		v-model="model"
		:disabled="disabled"
		:class="[
			'ui-checkbox',
			{ 'ui-checkbox--disabled': disabled },
			{ 'ui-checkbox--checked': model },
			{ 'ui-checkbox--error': error },
		]"
	>
		<span class="ui-checkbox__box">
			<span class="ui-checkbox__icon">
				<slot name="icon">
					<UIIcon name="check" size="small" />
				</slot>
			</span>
		</span>
		<span v-if="slots.default || label" class="ui-checkbox__label">
			<slot>
				{{ label }}
			</slot>
		</span>
	</CheckboxPrimitive>
</template>

<style scoped lang="scss">
	.ui-checkbox {
		$self: &;
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-150);
		cursor: pointer;
		user-select: none;

		&__box {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 20px;
			height: 20px;
			border: var(--border-1) solid var(--border-strong);
			border-radius: var(--corner-8);
			stroke: var(--text-on-primary);

			transition:
				background-color 0.2s,
				border-color 0.2s;
		}

		&__icon {
			display: inline-flex;
			width: 70%;
			opacity: 0;
			transition: opacity 0.2s;
		}

		&:hover:not(&--disabled) {
			@media (hover: hover) {
				& #{$self}__box {
					border-color: var(--border-focus);
				}
			}
		}

		&:has(:focus-visible):not(&--disabled) {
			& #{$self}__box {
				outline: var(--border-1) solid var(--border-focus);
				outline-offset: var(--border-1);
			}
		}

		&--checked {
			& #{$self}__box {
				background-color: var(--bg-primary);
			}

			& #{$self}__icon {
				opacity: 1;
			}
		}

		&--error:not(&--disabled):not(&--checked) {
			& #{$self}__box {
				border-color: var(--border-danger);
			}

			& #{$self}__label {
				color: var(--text-danger);
			}
		}

		&--disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}
	}
</style>
