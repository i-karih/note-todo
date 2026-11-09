import type { Slot } from 'vue'

export type CardProps = {
	title?: string
	description?: string
	size?: 'large' | 'medium' | 'small'
	interactive?: boolean
}

export type CardSlots = {
	header?: Slot
	description?: Slot
	default?: Slot
	footer?: Slot
	card?: Slot
}
