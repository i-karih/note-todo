import type { Slot } from 'vue'

export type HeaderTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type ConfirmModalEmit = {
	confirm: []
	cancel: []
}

export type ModalProps = {
	to?: string
	title?: string
	content?: string
	headerTag?: HeaderTag
}

export type ConfirmModalProps = ModalProps & {
	confirmText?: string
	cancelText?: string
}

export type ModalSlots = {
	header?: Slot
	footer?: Slot
	default?: Slot
}
