import type { Slot } from 'vue'

export type InputModel = string | number

export type InputProps = {
	label?: string
	disabled?: boolean
	size?: 'large' | 'medium'
	status?: 'default' | 'success' | 'warning' | 'danger'
	message?: string
	placeholder?: string
	type?: 'text' | 'password' | 'email'
	readonly?: boolean
}

export type InputSlots = {
	label?: Slot
	left?: Slot
	right?: Slot
	message?: Slot
}

export type InputEmits = {
	input: [value: InputModel]
	blur: [value: InputModel]
	focus: [value: InputModel]
}
