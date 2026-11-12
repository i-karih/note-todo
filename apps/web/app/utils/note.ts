import type { Note, Task } from '~/types'

import { createId } from './id'

export const createEmptyTask = (): Task => ({
	id: createId(),
	label: '',
	done: false,
})

export const createEmptyNote = (): Note => ({
	id: createId(),
	title: '',
	tasks: [createEmptyTask()],
})

// eslint-disable-next-line unicorn/prefer-structured-clone -- structuredClone не умеет клонировать реактивные Proxy Vue
export const cloneNote = (note: Note): Note => JSON.parse(JSON.stringify(note))
