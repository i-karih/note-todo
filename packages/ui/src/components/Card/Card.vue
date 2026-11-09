<script setup lang="ts">
	import type { CardProps, CardSlots } from './Card.types'

	const {
		title = '',
		description = '',
		size = 'large',
		interactive = false,
	} = defineProps<CardProps>()

	const slots = defineSlots<CardSlots>()
</script>

<template>
	<div
		:class="[
			'ui-card',
			`ui-card--${size}`,
			{ 'ui-card--interactive': interactive },
		]"
	>
		<slot name="card">
			<div v-if="title || slots.header" class="ui-card__header">
				<slot name="header">
					<h2 class="ui-card__title text-heading-l">
						{{ title }}
					</h2>
					<p
						v-if="description || slots.description"
						class="ui-card__description text-body-m"
					>
						<slot name="description">
							{{ description }}
						</slot>
					</p>
				</slot>
			</div>

			<div v-if="slots.default" class="ui-card__content">
				<slot />
			</div>

			<div v-if="slots.footer" class="ui-card__footer">
				<slot name="footer" />
			</div>
		</slot>
	</div>
</template>

<style scoped lang="scss">
	.ui-card {
		--card-padding-l: var(--spacing-300);
		--card-padding-m: var(--spacing-250);
		--card-padding-s: var(--spacing-200);
		@include sm {
			--card-padding-l: var(--spacing-400);
			--card-padding-m: var(--spacing-300);
		}

		display: flex;
		flex-direction: column;
		gap: var(--spacing-300);
		background-color: var(--card-bg-color, var(--bg-surface));
		border: var(--border-1) solid var(--card-border, var(--border-default));
		border-radius: var(--corner-16);
		box-shadow: var(--shadow-dark);
		transition:
			background-color 0.2s,
			border-color 0.2s;

		&__content {
			display: flex;
			flex-direction: column;

			max-height: 100%;
		}

		&--interactive {
			cursor: pointer;
			background-color: var(--card-bg-color, var(--bg-base));

			&:hover {
				@media (hover: hover) {
					border-color: var(--card-border-hover, var(--border-strong));
					background-color: var(--card-bg-color-hover, var(--bg-hover));
				}
			}

			&:active {
				border-color: var(--card-border-pressed, var(--border-strong));
				background-color: var(--card-bg-color-pressed, var(--bg-muted));
			}
		}

		&--disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}

		&--large {
			padding: var(--card-padding-l);
		}

		&--medium {
			padding: var(--card-padding-m);
		}

		&--small {
			padding: var(--card-padding-m);
			border-radius: var(--corner-12);
		}

		&__description {
			margin-top: var(--spacing-50);
			color: var(--text-muted);
		}
	}
</style>
