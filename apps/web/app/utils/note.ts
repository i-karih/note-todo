import type { Note, Task } from '~/types'

export const createEmptyTask = (): Task => ({
	id: crypto.randomUUID(),
	label: '',
	done: false,
})

export const createEmptyNote = (): Note => ({
	id: crypto.randomUUID(),
	title: '',
	tasks: [createEmptyTask()],
})
