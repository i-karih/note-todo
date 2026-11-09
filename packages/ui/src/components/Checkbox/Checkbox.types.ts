import type { Slot } from 'vue'

export type CheckboxProps = {
	disabled?: boolean
	label?: string
	error?: boolean
}

export type CheckboxSlots = {
	default?: Slot
	icon?: Slot
}
