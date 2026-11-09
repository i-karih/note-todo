export type IconName =
	'check' | 'circle' | 'plus' | 'trash' | 'edit' | 'arrow-left' | 'close'

export type IconSize = 'small' | 'medium' | 'large'

export type IconProps = {
	name: IconName
	size?: IconSize
}
