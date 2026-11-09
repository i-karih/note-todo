<script setup lang="ts">
	import type {
		InputEmits,
		InputModel,
		InputProps,
		InputSlots,
	} from './Input.types'
	import { computed, useId } from 'vue'

	const modelValue = defineModel<InputModel>({ required: true })

	const {
		size = 'large',
		placeholder = '',
		status = 'default',
		message = '',
		disabled = false,
		readonly = false,
		type = 'text',
		label = '',
	} = defineProps<InputProps>()

	const slots = defineSlots<InputSlots>()

	const id = useId()
	const messageId = computed(() => `${id}-message`)
	const hasMessage = computed(() => slots.message || message)

	const inputAttrs = computed(() => ({
		type,
		placeholder,
		readonly,
		disabled,
		id,
		class: 'ui-input__input',
		'aria-describedby': hasMessage.value ? messageId.value : undefined,
	}))

	const emit = defineEmits<InputEmits>()

	const handleInput = () => {
		emit('input', modelValue.value)
	}

	const handleBlur = () => {
		emit('blur', modelValue.value)
	}

	const handleFocus = () => {
		emit('focus', modelValue.value)
	}
</script>

<template>
	<div
		:class="[
			`ui-input--${size}`,
			`ui-input--${status}`,
			{ 'ui-input--disabled': disabled },
			{ 'ui-input--readonly': readonly },
		]"
		class="ui-input"
	>
		<label
			v-if="slots.label || label"
			:for="id"
			class="ui-input__label text-label"
		>
			<slot name="label">
				{{ label }}
			</slot>
		</label>
		<label :for="id" class="ui-input__wrapper">
			<span v-if="slots.left" class="ui-input__left">
				<slot name="left" />
			</span>
			<input
				v-model="modelValue"
				v-bind="inputAttrs"
				@input="handleInput"
				@blur="handleBlur"
				@focus="handleFocus"
			/>
			<span v-if="slots.right" class="ui-input__right">
				<slot name="right" />
			</span>
		</label>
		<span
			v-if="hasMessage"
			:id="messageId"
			:class="[`ui-input__message--${status}`]"
			class="ui-input__message text-caption"
		>
			<slot name="message">
				{{ message }}
			</slot>
		</span>
	</div>
</template>

<style scoped lang="scss">
	.ui-input {
		$self: &;

		display: flex;
		flex-direction: column;

		&__label {
			display: inline-block;
			padding: 0 var(--spacing-50);
			margin-bottom: var(--spacing-100);
		}

		&__wrapper {
			display: flex;
			align-items: center;
			gap: var(--spacing-50);
			background-color: var(--bg-base);
			border-radius: var(--corner-12);
			border: var(--border-1) solid var(--border-default);
			transition:
				border-color 0.1s,
				background-color 0.2s;

			&:hover {
				@media (hover: hover) {
					border-color: var(--border-strong);
				}
			}

			&:focus-within {
				border-color: var(--border-focus);
			}
		}

		&__left,
		&__right {
			color: var(--text-hint);
		}

		&__input {
			display: inline-flex;
			width: 100%;
			font-family: inherit;
			background-color: transparent;
			border: none;
			outline: none;
			color: inherit;

			&::placeholder {
				color: var(--text-placeholder);
			}

			&:disabled {
				pointer-events: none;
			}
		}

		&__message {
			display: block;
			padding: 0 var(--spacing-150);
			margin-top: var(--spacing-50);

			&--default {
				color: var(--text-hint);
			}

			&--success {
				color: var(--text-success);
			}

			&--danger {
				color: var(--text-danger);
			}

			&--warning {
				color: var(--text-warning);
			}
		}

		&--danger {
			#{$self}__wrapper {
				border-color: var(--border-danger);
			}
		}

		&--warning {
			#{$self}__wrapper {
				border-color: var(--border-warning);
			}
		}

		&--large {
			#{$self}__wrapper {
				padding: var(--spacing-150) var(--spacing-200);
			}
		}
		&--medium {
			#{$self}__wrapper {
				padding: var(--spacing-100) var(--spacing-150);
			}
		}

		&--readonly {
			#{$self}__wrapper {
				background-color: var(--bg-muted);

				&:hover {
					@media (hover: hover) {
						border-color: var(--border-default);
					}
				}
			}
		}

		&--disabled {
			#{$self}__wrapper {
				color: var(--text-disabled);
				background-color: var(--bg-muted);
				cursor: not-allowed;

				&:hover {
					@media (hover: hover) {
						border-color: var(--border-default);
					}
				}

				&:focus-within {
					border-color: var(--border-default);
				}
			}
		}
	}
</style>
