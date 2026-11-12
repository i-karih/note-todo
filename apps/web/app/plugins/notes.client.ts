import { useNotesStore } from '~/stores/notes.ts'

export default defineNuxtPlugin(() => {
	const notesStore = useNotesStore()
	notesStore.getNotesFromStorage()

	window.addEventListener('pagehide', notesStore.flushToStorage)
})
