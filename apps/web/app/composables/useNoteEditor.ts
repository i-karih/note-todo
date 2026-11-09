import type { MaybeRefOrGetter } from 'vue'
import { useNotesStore } from "~/stores/notes.ts";
import type {Note} from "~/types";
import {createEmptyNote, createEmptyTask} from "~/utils";

export const useNoteEditor = (noteId: MaybeRefOrGetter<string>) => {
	const notesStore = useNotesStore()

	const isNew = computed(() => toValue(noteId) === 'new')

	const note = computed(() => isNew.value ? null : notesStore.getNoteById(toValue(noteId)))

	const draft = ref<Note>(!note.value ? createEmptyNote() : JSON.parse(JSON.stringify(note.value)))

	const addNewTaskForNote = () => draft.value.tasks.push(createEmptyTask())

	const isNotFound = computed(() => !isNew.value && !note.value)

	const emptyNoteTitle = computed(() => !draft.value.title.trim())

	const errorNoteTitle = ref('');

	const removeTask = (id: string) => {
		draft.value.tasks = draft.value.tasks.filter(task => task.id !== id)
	}

	const saveNote = () => {
		if(emptyNoteTitle.value) {
			errorNoteTitle.value = 'Поле обязательно для заполнения'
		} else {
			errorNoteTitle.value = ''

			notesStore.saveNote({
				...draft.value,
				tasks: draft.value.tasks.filter((task) => task.label.trim()),
			})
			navigateTo('/')
		}
	}

	const removeNote = async () => {
		await navigateTo('/', { replace: true })
		notesStore.removeNoteById(draft.value.id)
	}

	const cancelEditNote = () => {
		navigateTo('/')

	}

	return {
		isNew,
		isNotFound,
		draft,
		errorNoteTitle,
		addNewTaskForNote,
		removeTask,
		removeNote,
		saveNote,
		cancelEditNote,
	}
}
