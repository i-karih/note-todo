import type { NoteStorage, Note } from '~/types'

import { NOTES_SCHEMA_VERSION, NOTES_STORAGE_KEY } from '~/constants'

export const loadNotes = () => {
	try {
		const raw = localStorage.getItem(NOTES_STORAGE_KEY)
		if (!raw) return []

		const data: NoteStorage = JSON.parse(raw)
		return data.version === NOTES_SCHEMA_VERSION && Array.isArray(data.notes)
			? data.notes
			: []
	} catch {
		return []
	}
}

export const saveNotes = (notes: Note[]) => {
	try {
		const data: NoteStorage = { version: NOTES_SCHEMA_VERSION, notes }
		localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(data))
	} catch {
		// хранилище недоступно или переполнено, данные останутся в памяти
	}
}
