import type { Slot } from 'vue'

export type CheckboxProps = {
	disabled?: boolean
	label?: string
	error?: boolean
	ariaLabel?: string
}

export type CheckboxPrimitiveProps = {
	disabled?: boolean
	ariaLabel?: string
}

export type CheckboxSlots = {
	default?: Slot
	icon?: Slot
}
