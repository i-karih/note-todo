import type { ConfirmModalProps } from '@note-todo/ui'

export type ConfirmOptions = ConfirmModalProps & {
	onConfirm?: () => void
	onCancel?: () => void
}
