import type { Note } from '~/types'

import { cloneNote } from '~/utils'

export const useNotesStore = defineStore('notes', () => {
	const notes = ref<Note[]>([
		{
			id: '1',
			title: 'тестовая заметка',
			tasks: [
				{
					id: '1',
					done: false,
					label: 'Купить яблоки',
				},
				{
					id: '2',
					done: true,
					label: 'Купить молоко',
				},
			],
		},
	])

	const getNoteById = (id: string) => {
		return notes.value.find((note) => note.id === id)
	}

	const removeNoteById = (id: string) => {
		notes.value = notes.value.filter((note) => note.id !== id)
	}

	const saveNote = (note: Note) => {
		const copy = cloneNote(note)
		const index = notes.value.findIndex(({ id }) => id === note.id)

		if (index === -1) {
			notes.value.unshift(copy)
		} else {
			notes.value[index] = copy
		}
	}

	return { notes, getNoteById, saveNote, removeNoteById }
})
