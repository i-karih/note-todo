import type { IconName, IconSize } from '../Icon/Icon.types'
import type { ButtonVariant } from './Buttons.types'
import type { Component } from 'vue'

export type IconButtonProps = {
	name: IconName
	size?: IconSize
	variant?: ButtonVariant
	to?: string
	href?: string
	as?: Component
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
}
