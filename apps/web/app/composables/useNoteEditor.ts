import type { Note, NoteInputValues, Task } from '~/types'
import type { MaybeRefOrGetter } from 'vue'

import { NOTES_SAVE_DELAY, NoteCommandType } from '~/constants'
import { useNotesStore } from '~/stores/notes.ts'
import {
	cloneNote,
	createEmptyNote,
	createEmptyTask,
	saveDraft,
	removeDraft,
	debounce,
} from '~/utils'

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

	const isSaveAttempted = ref(false)

	const titleError = computed(() =>
		isSaveAttempted.value && isTitleEmpty.value
			? 'Поле обязательно для заполнения'
			: ''
	)

	const storedDraft = isNotFound.value ? null : loadDraft(toValue(noteId))

	const hasStoreDraft = Boolean(storedDraft)

	const restoreDraft = () => {
		if (!storedDraft) return

		draft.value = cloneNote(storedDraft)
		clearHistory()
	}

	const cancelEditNote = () => {
		clearHistory()
		clearDraft()

		navigateTo('/')
	}

	const saveNote = () => {
		isSaveAttempted.value = true

		if (isTitleEmpty.value) return

		notesStore.saveNote({
			...draft.value,
			tasks: draft.value.tasks.filter((task) => task.label.trim()),
		})

		clearHistory()
		clearDraft()

		navigateTo('/')
	}

	const removeNote = async () => {
		saveDraftDebounced.cancel()
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

	const saveDraftDebounced = debounce(saveDraft, NOTES_SAVE_DELAY)

	const clearDraft = () => {
		saveDraftDebounced.cancel()
		removeDraft(toValue(noteId))
	}

	const isDraftChanged = () => {
		return note.value
			? JSON.stringify(draft.value) !== JSON.stringify(note.value)
			: Boolean(
					draft.value.title.trim() ||
					draft.value.tasks.some((task) => task.label.trim())
				)
	}

	watch(
		draft,
		() => {
			if (isDraftChanged()) {
				saveDraftDebounced(toValue(noteId), draft.value)
			} else {
				clearDraft()
			}
		},
		{ deep: true }
	)

	const flushDraft = () => {
		saveDraftDebounced.cancel()
		if (isDraftChanged()) saveDraft(toValue(noteId), draft.value)
	}

	const handleVisibilityChange = () => {
		if (document.visibilityState === 'hidden') flushDraft()
	}

	onMounted(() => {
		document.addEventListener('visibilitychange', handleVisibilityChange)
	})

	onBeforeUnmount(() => {
		document.removeEventListener('visibilitychange', handleVisibilityChange)
	})

	return {
		isNew,
		isNotFound,
		draft,
		hasStoreDraft,
		restoreDraft,
		titleError,
		setTitle,
		setTaskLabel,
		toggleTask,
		addTask,
		removeTask,
		removeNote,
		saveNote,
		cancelEditNote,
		clearDraft,
		undo,
		redo,
	}
}
