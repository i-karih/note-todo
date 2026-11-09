import { type Ref, nextTick, watch, onBeforeUnmount } from 'vue'

const FOCUSABLE = [
	'a[href]',
	'button:not([disabled])',
	'input:not([disabled]):not([type="hidden"])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join(',')

const getNextIndex = (
	activeIndex: number,
	length: number,
	isBackward: boolean
) => {
	if (activeIndex === -1) {
		return isBackward ? length - 1 : 0
	}

	const step = isBackward ? -1 : 1

	return (activeIndex + step + length) % length
}

export const useFocusTrap = (
	container: Readonly<Ref<HTMLElement | null>>,
	isActive: () => boolean
) => {
	let previouslyFocusedElement: HTMLElement | null = null

	const getFocusableElements = () => [
		...(container.value?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
	]

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key !== 'Tab') return
		event.preventDefault()

		const items = getFocusableElements()

		const activeFocusItemIndex = items.indexOf(
			document.activeElement as HTMLElement
		)

		items[
			getNextIndex(activeFocusItemIndex, items.length, event.shiftKey)
		]?.focus()
	}

	const activateFocusTrap = async () => {
		previouslyFocusedElement = document.activeElement as HTMLElement | null

		await nextTick()

		const firstActiveFocusItem =
			container.value?.querySelector<HTMLElement>('[autofocus]') ??
			getFocusableElements()[0] ??
			container.value

		firstActiveFocusItem?.focus()

		document.addEventListener('keydown', handleKeyDown)
	}

	const deactivateFocusTrap = () => {
		document.removeEventListener('keydown', handleKeyDown)

		previouslyFocusedElement?.focus()
		previouslyFocusedElement = null
	}

	watch(
		isActive,
		(value) => {
			if (typeof document === 'undefined') return

			const toggleTrap = value ? activateFocusTrap : deactivateFocusTrap

			toggleTrap()
		},
		{ immediate: true }
	)

	onBeforeUnmount(() => deactivateFocusTrap())
}
