import type { Note } from '~/types'

import { NOTES_SAVE_DELAY } from '~/constants'
import { cloneNote, saveNotes, loadNotes } from '~/utils'

export const useNotesStore = defineStore('notes', () => {
	const notes = ref<Note[]>([])

	const hasNotes = computed(() => notes.value.length > 0)

	const getNotesFromStorage = () => {
		notes.value = loadNotes()
	}

	const saveNotesDebounced = debounce(saveNotes, NOTES_SAVE_DELAY)

	const getNoteById = (id: string) => {
		return notes.value.find((note) => note.id === id)
	}

	const removeNoteById = (id: string) => {
		notes.value = notes.value.filter((note) => note.id !== id)

		saveNotesDebounced(notes.value)
	}

	const saveNote = (note: Note) => {
		const copy = cloneNote(note)
		const index = notes.value.findIndex(({ id }) => id === note.id)

		if (index === -1) {
			notes.value.unshift(copy)
		} else {
			notes.value[index] = copy
		}

		saveNotesDebounced(notes.value)
	}

	const flushToStorage = () => {
		saveNotesDebounced.cancel()
		saveNotes(notes.value)
	}

	return {
		notes,
		hasNotes,
		getNoteById,
		saveNote,
		removeNoteById,
		getNotesFromStorage,
		flushToStorage,
	}
})
