import type { ConfirmOptions } from '~/types'

export const useConfirmStore = defineStore('confirm', () => {
	const isModalOpen = ref<boolean>(false)
	const options = ref<ConfirmOptions | null>(null)

	const open = (value: ConfirmOptions) => {
		options.value = value
		isModalOpen.value = true
	}

	const confirm = () => {
		options.value?.onConfirm?.()
		isModalOpen.value = false
	}

	const cancel = () => {
		options.value?.onCancel?.()
		isModalOpen.value = false
	}

	return {
		isModalOpen,
		options,
		open,
		confirm,
		cancel,
	}
})
