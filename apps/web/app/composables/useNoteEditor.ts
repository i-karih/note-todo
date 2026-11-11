import type { Note, NoteInputValues, Task } from '~/types'
import type { MaybeRefOrGetter } from 'vue'

import { NoteCommandType } from '~/constants'
import { useNotesStore } from '~/stores/notes.ts'
import { cloneNote, createEmptyNote, createEmptyTask } from '~/utils'

export const useNoteEditor = (noteId: MaybeRefOrGetter<string>) => {
	const notesStore = useNotesStore()

	const isNew = computed(() => toValue(noteId) === 'new')

	const note = computed(() =>
		isNew.value ? null : notesStore.getNoteById(toValue(noteId))
	)

	const draft = ref<Note>(
		note.value ? cloneNote(note.value) : createEmptyNote()
	)

	const { recordCommand, undo, redo, clearHistory } = useNoteHistory(draft)

	const isNotFound = computed(() => !isNew.value && !note.value)

	const isTitleEmpty = computed(() => !draft.value.title.trim())

	const titleError = ref('')

	const cancelEditNote = () => {
		clearHistory()

		navigateTo('/')
	}

	const saveNote = () => {
		if (isTitleEmpty.value) {
			titleError.value = 'Поле обязательно для заполнения'
		} else {
			titleError.value = ''

			notesStore.saveNote({
				...draft.value,
				tasks: draft.value.tasks.filter((task) => task.label.trim()),
			})

			clearHistory()

			navigateTo('/')
		}
	}

	const removeNote = async () => {
		await navigateTo('/', { replace: true })
		notesStore.removeNoteById(draft.value.id)
	}

	const removeTask = (id: string) => {
		const taskIndex = draft.value.tasks.findIndex((task) => task.id === id)
		const task = draft.value.tasks[taskIndex]

		if (!task) return

		recordCommand({
			type: NoteCommandType.RemoveTask,
			task: { ...task },
			index: taskIndex,
		})

		draft.value.tasks.splice(taskIndex, 1)
	}

	const addTask = () => {
		const task = createEmptyTask()
		draft.value.tasks.push(task)

		recordCommand({
			type: NoteCommandType.AddTask,
			task: { ...task },
			index: draft.value.tasks.length - 1,
		})
	}

	const toggleTask = (taskId: Task['id']) => {
		recordCommand({
			type: NoteCommandType.ToggleTask,
			taskId,
		})
	}

	const setTitle = ({ oldValue, newValue }: NoteInputValues) => {
		recordCommand({
			type: NoteCommandType.SetTitle,
			oldValue,
			newValue,
		})
	}

	const setTaskLabel = ({ id, oldValue, newValue }: NoteInputValues) => {
		if (!id) return

		recordCommand({
			type: NoteCommandType.SetTaskLabel,
			taskId: id,
			oldValue,
			newValue,
		})
	}

	return {
		isNew,
		isNotFound,
		draft,
		titleError,
		setTitle,
		setTaskLabel,
		toggleTask,
		addTask,
		removeTask,
		removeNote,
		saveNote,
		cancelEditNote,
		undo,
		redo,
	}
}
