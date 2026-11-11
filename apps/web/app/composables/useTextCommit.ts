import type { NoteInputValues, TextCommitCallback } from '~/types'

import { HISTORY_DEBOUNCE_DELAY } from '~/constants'

export const useTextCommit = () => {
	const valueForCommit = ref<NoteInputValues>({
		oldValue: '',
		newValue: '',
	})

	const setStartText = (value: string, id?: string) => {
		valueForCommit.value = { id, oldValue: value, newValue: value }
	}

	const commitText = (callback: TextCommitCallback) => {
		if (valueForCommit.value.oldValue === valueForCommit.value.newValue) return

		callback({ ...valueForCommit.value })

		valueForCommit.value.oldValue = valueForCommit.value.newValue
	}

	const commitTextDebounced = debounce(commitText, HISTORY_DEBOUNCE_DELAY)

	const commitTextOnPause = (value: string, callback: TextCommitCallback) => {
		valueForCommit.value.newValue = value
		commitTextDebounced(callback)
	}

	const commitTextOnBlur = (value: string, callback: TextCommitCallback) => {
		commitTextDebounced.cancel()
		valueForCommit.value.newValue = value
		commitText(callback)
	}

	return {
		setStartText,
		commitTextOnPause,
		commitTextOnBlur,
	}
}
