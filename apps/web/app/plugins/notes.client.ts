import { useNotesStore } from '~/stores/notes.ts'

export default defineNuxtPlugin(() => {
	const notesStore = useNotesStore()
	notesStore.getNotesFromStorage()

	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'hidden') notesStore.flushToStorage()
	})
})
