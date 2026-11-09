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

// eslint-disable-next-line unicorn/prefer-structured-clone -- structuredClone не умеет клонировать реактивные Proxy Vue
export const cloneNote = (note: Note): Note => JSON.parse(JSON.stringify(note))
