import { useConfirmStore } from '~/stores/confirm.ts'

const isTextField = (target: EventTarget | null) =>
	(target instanceof HTMLInputElement && target.type !== 'checkbox') ||
	target instanceof HTMLTextAreaElement ||
	(target instanceof HTMLElement && target.isContentEditable)

export const useHistoryHotkeys = (undo: () => void, redo: () => void) => {
	const confirmStore = useConfirmStore()

	const handleKeydown = (event: KeyboardEvent) => {
		const isModifier = event.ctrlKey || event.metaKey

		if (
			!isModifier ||
			confirmStore.isModalOpen ||
			event.code !== 'KeyZ' ||
			isTextField(event.target)
		)
			return
		event.preventDefault()

		if (event.shiftKey) {
			redo()
		} else {
			undo()
		}
	}

	onMounted(() => document.addEventListener('keydown', handleKeydown))
	onBeforeUnmount(() => document.removeEventListener('keydown', handleKeydown))
}
