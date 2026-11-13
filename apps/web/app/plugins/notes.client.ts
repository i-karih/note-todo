import { NOTES_STORAGE_KEY } from '~/constants'
import { useNotesStore } from '~/stores/notes.ts'
import { cleanupDrafts } from '~/utils'

export default defineNuxtPlugin(() => {
	const notesStore = useNotesStore()
	notesStore.getNotesFromStorage()
	cleanupDrafts(notesStore.notes.map((note) => note.id))

	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'hidden') notesStore.flushToStorage()
	})

	globalThis.addEventListener('storage', (event: StorageEvent) => {
		if (event.key === NOTES_STORAGE_KEY) notesStore.getNotesFromStorage()
	})
})
