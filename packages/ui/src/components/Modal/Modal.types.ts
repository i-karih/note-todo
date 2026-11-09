import type { Slot } from 'vue'

export type HeaderTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type ModalProps = {
	to?: string
	title?: string
	content?: string
	headerTag?: HeaderTag
}

export type ModalSlots = {
	header?: Slot
	footer?: Slot
	default?: Slot
}
