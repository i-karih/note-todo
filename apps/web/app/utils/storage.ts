import type { Note, NoteStorage, NoteDraftStorage } from '~/types'

import {
	DRAFT_STORAGE_PREFIX,
	DRAFT_TTL,
	NOTES_SCHEMA_VERSION,
	NOTES_STORAGE_KEY,
} from '~/constants'

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

const getDraftKey = (noteId: string) => `${DRAFT_STORAGE_PREFIX}${noteId}`

export const isDraftExpired = (savedAt: number) =>
	Date.now() - savedAt > DRAFT_TTL

export const loadDraft = (noteId: string) => {
	try {
		const raw = localStorage.getItem(getDraftKey(noteId))
		if (!raw) return null

		const data: NoteDraftStorage = JSON.parse(raw)
		if (data.version !== NOTES_SCHEMA_VERSION) return null

		if (isDraftExpired(data.savedAt)) {
			removeDraft(noteId)
			return null
		}

		return data.note
	} catch {
		return null
	}
}

export const saveDraft = (noteId: string, note: Note) => {
	try {
		const data: NoteDraftStorage = {
			version: NOTES_SCHEMA_VERSION,
			savedAt: Date.now(),
			note,
		}
		localStorage.setItem(getDraftKey(noteId), JSON.stringify(data))
	} catch {
		// хранилище недоступно или переполнено
	}
}

export const removeDraft = (noteId: string) => {
	try {
		localStorage.removeItem(getDraftKey(noteId))
	} catch {
		// хранилище недоступно
	}
}

export const cleanupDrafts = (noteIds: string[]) => {
	try {
		const draftKeys = Object.keys(localStorage).filter((key) =>
			key.startsWith(DRAFT_STORAGE_PREFIX)
		)

		for (const key of draftKeys) {
			const noteId = key.slice(DRAFT_STORAGE_PREFIX.length)
			const isOrphan = noteId !== 'new' && !noteIds.includes(noteId)

			const raw = localStorage.getItem(key)
			const data: NoteDraftStorage | null = raw ? JSON.parse(raw) : null

			const isExpired = !data || isDraftExpired(data.savedAt)

			if (isOrphan || isExpired) localStorage.removeItem(key)
		}
	} catch {
		// хранилище недоступно
	}
}
