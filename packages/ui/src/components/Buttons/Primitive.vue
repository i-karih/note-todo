<script setup lang="ts">
	import type { ButtonSlots, PrimitiveProps } from './Buttons.types'
	import type { Component } from 'vue'
	import { computed, inject } from 'vue'

	import { UISpinner } from '../Spinner'
	import { LinkComponentKey } from './Buttons.constants'

	type As = Component | 'a' | 'button'

	const {
		as,
		disabled = false,
		loading = false,
		loadingText,
		to = '',
		href = '',
	} = defineProps<PrimitiveProps>()

	const slots = defineSlots<ButtonSlots>()

	const injectedLinkComponent = inject(LinkComponentKey)

	const component = computed<As>(() => {
		if (to) return as ?? injectedLinkComponent ?? 'a'
		if (href) return 'a'
		return 'button'
	})

	const hasLinkComponent = computed(() => !!(as ?? injectedLinkComponent))

	const linkProps = computed(() => {
		if (to) {
			return hasLinkComponent.value ? { to } : { href: to }
		}
		if (href)
			return {
				href,
				target: '_blank',
				rel: 'noopener noreferrer',
			}
		return { disabled: disabled || loading || undefined }
	})
</script>

<template>
	<component
		:is="component"
		v-bind="linkProps"
		class="ui-button"
		:class="{
			'ui-button--loading': loading,
			'ui-button--disabled': disabled,
		}"
	>
		<span v-if="!loading" class="ui-button__content">
			<span v-if="slots.left" class="ui-button__left">
				<slot name="left" />
			</span>

			<slot />

			<span v-if="slots.right" class="ui-button__right">
				<slot name="right" />
			</span>
		</span>

		<span v-else class="ui-button__loading">
			<UISpinner size="auto" />
			{{ loadingText }}
		</span>
	</component>
</template>

<style scoped lang="scss">
	.ui-button {
		display: inline-flex;
		cursor: pointer;
		user-select: none;

		&__content {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			gap: var(--spacing-100);
			width: 100%;
			height: 100%;
		}

		&__loading {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: var(--spacing-100);
		}

		&--loading {
			pointer-events: none;
		}

		&:disabled,
		&--disabled {
			cursor: not-allowed;
			opacity: 0.4;
		}
	}
</style>
