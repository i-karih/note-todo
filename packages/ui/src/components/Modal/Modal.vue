<script setup lang="ts">
	import type { ModalProps, ModalSlots } from './Modal.types'
	import { onBeforeUnmount, useId, useTemplateRef, watch } from 'vue'

	import { useFocusTrap } from '../../composables'
	import CloseButton from '../Buttons/CloseButton.vue'
	import ModalBody from './ModalBody.vue'
	import ModalContent from './ModalContent.vue'
	import ModalFooter from './ModalFooter.vue'
	import ModalOverlay from './ModalOverlay.vue'
	import ModalTitle from './ModalTitle.vue'

	const {
		title = '',
		content = '',
		to = 'body',
		headerTag = 'h2',
	} = defineProps<ModalProps>()

	const dialogRef = useTemplateRef<HTMLElement>('dialogRef')

	const model = defineModel<boolean>()

	const slots = defineSlots<ModalSlots>()

	const titleId = useId()

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape' || event.key === 'Esc') {
			closeModal()
		}
	}

	const closeModal = () => {
		model.value = false
	}

	useFocusTrap(dialogRef, () => !!model.value)

	watch(
		model,
		(value) => {
			if (typeof document === 'undefined') return

			if (value) {
				globalThis.addEventListener('keydown', handleKeyDown)
			} else {
				globalThis.removeEventListener('keydown', handleKeyDown)
			}
			document.body.classList.toggle('no-scroll', !!value)
		},
		{ immediate: true }
	)

	onBeforeUnmount(() => {
		document.body.classList.remove('no-scroll')
		globalThis.removeEventListener('keydown', handleKeyDown)
	})
</script>

<template>
	<teleport :to="to">
		<Transition name="fade" mode="out-in">
			<div v-if="model" ref="dialogRef" tabindex="-1" class="ui-modal">
				<ModalOverlay @mousedown.self="closeModal">
					<ModalBody
						aria-modal="true"
						:aria-labelledby="titleId"
						role="dialog"
						class="ui-modal__body"
					>
						<CloseButton
							aria-label="Закрыть модальное окно"
							class="ui-modal__close"
							@click="closeModal"
						/>
						<ModalTitle :id="titleId" :tag="headerTag">
							<slot name="header">
								{{ title }}
							</slot>
						</ModalTitle>

						<ModalContent>
							<slot>
								{{ content }}
							</slot>
						</ModalContent>

						<ModalFooter v-if="slots.footer">
							<slot name="footer" />
						</ModalFooter>
					</ModalBody>
				</ModalOverlay>
			</div>
		</Transition>
	</teleport>
</template>

<style>
	:root {
		--ui-modal-z-index: 100;
		--ui-modal-max-width: 440px;
	}
</style>

<style scoped lang="scss">
	.ui-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: var(--ui-modal-z-index);

		&__close {
			position: absolute;
			top: 8px;
			right: 8px;
		}
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.2s;

		& .ui-modal {
			&__body {
				transition: transform 0.2s;
			}
		}
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;

		& .ui-modal {
			&__body {
				transform: scale(0.85);
			}
		}
	}

	.fade-leave,
	.fade-enter-to {
		opacity: 1;

		& .ui-modal {
			&__body {
				transform: scale(1);
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.fade-enter-active,
		.fade-leave-active {
			&,
			& .ui-modal__body {
				transition: none;
			}
		}
	}
</style>
