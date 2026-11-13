import type { Note } from '~/types'
import { describe, expect, it } from 'vitest'
import { ref } from 'vue'

import { useNoteHistory } from '~/composables/useNoteHistory'
import { HISTORY_LIMIT, NoteCommandType } from '~/constants'

const createNote = (): Note => ({
	id: 'note',
	title: 'Покупки',
	tasks: [
		{ id: 'task-1', label: 'хлеб', done: false },
		{ id: 'task-2', label: 'молоко', done: true },
		{ id: 'task-3', label: 'сыр', done: false },
	],
})

const setup = () => {
	const draft = ref(createNote())
	const history = useNoteHistory(draft)
	return { draft, history }
}

const getTask = (note: Note, index: number) => {
	const task = note.tasks[index]
	if (!task) throw new Error(`Нет пункта с индексом ${index}`)
	return task
}

const changeTitle = (
	{ draft, history }: ReturnType<typeof setup>,
	newValue: string
) => {
	const oldValue = draft.value.title

	draft.value.title = newValue
	history.recordCommand({
		type: NoteCommandType.SetTitle,
		oldValue,
		newValue,
	})
}

describe('useNoteHistory', () => {
	it('откатывает и повторяет изменение названия заметки', () => {
		const { draft, history } = setup()

		const oldValue = draft.value.title
		const newValue = 'Продукты'

		draft.value.title = newValue
		history.recordCommand({
			type: NoteCommandType.SetTitle,
			oldValue,
			newValue,
		})

		history.undo()
		expect(draft.value.title).toBe(oldValue)

		history.redo()
		expect(draft.value.title).toBe(newValue)
	})

	it('откатывает и повторяет изменение текста пункта', () => {
		const { draft, history } = setup()
		const task = getTask(draft.value, 0)

		const oldValue = task.label
		const newValue = 'хлеб белый'

		task.label = newValue
		history.recordCommand({
			type: NoteCommandType.SetTaskLabel,
			taskId: task.id,
			oldValue,
			newValue,
		})

		history.undo()
		expect(getTask(draft.value, 0).label).toBe(oldValue)

		history.redo()
		expect(getTask(draft.value, 0).label).toBe(newValue)
	})

	it('откатывает и повторяет отметку пункта', () => {
		const { draft, history } = setup()
		const task = getTask(draft.value, 0)
		const oldDone = task.done

		task.done = !oldDone
		history.recordCommand({
			type: NoteCommandType.ToggleTask,
			taskId: task.id,
		})

		history.undo()
		expect(getTask(draft.value, 0).done).toBe(oldDone)

		history.redo()
		expect(getTask(draft.value, 0).done).toBe(!oldDone)
	})

	it('откатывает и повторяет добавление пункта', () => {
		const { draft, history } = setup()
		const task = { id: 'task-new', label: 'чай', done: false }

		draft.value.tasks.push({ ...task })
		history.recordCommand({
			type: NoteCommandType.AddTask,
			task,
			index: draft.value.tasks.length - 1,
		})

		history.undo()
		expect(draft.value.tasks).toEqual(createNote().tasks)

		history.redo()
		expect(draft.value.tasks).toEqual([...createNote().tasks, task])
	})

	it('при откате удаления возвращает пункт на прежнее место', () => {
		const { draft, history } = setup()
		const index = 1
		const task = { ...getTask(draft.value, index) }

		draft.value.tasks.splice(index, 1)
		history.recordCommand({
			type: NoteCommandType.RemoveTask,
			task,
			index,
		})

		history.undo()
		expect(draft.value.tasks).toEqual(createNote().tasks)

		history.redo()
		expect(draft.value.tasks.map(({ id }) => id)).toEqual(['task-1', 'task-3'])
	})

	it('новое действие после отката очищает redo', () => {
		const context = setup()

		changeTitle(context, 'Продукты')

		context.history.undo()

		expect(context.history.canRedo.value).toBe(true)

		changeTitle(context, 'Список')
		expect(context.history.canRedo.value).toBe(false)
	})

	it(`хранит не больше ${HISTORY_LIMIT} записей`, () => {
		const context = setup()

		const changes = HISTORY_LIMIT + 1

		for (let step = 1; step <= changes; step++) {
			changeTitle(context, `Заметка ${step}`)
		}

		for (let step = 1; step <= changes; step++) {
			context.history.undo()
		}

		expect(context.draft.value.title).toBe('Заметка 1')
		expect(context.history.canUndo.value).toBe(false)
	})

	it('undo и redo без записей ничего не меняют', () => {
		const { draft, history } = setup()
		expect(history.canUndo.value).toBe(false)
		expect(history.canRedo.value).toBe(false)

		history.undo()
		history.redo()

		expect(draft.value).toEqual(createNote())
	})

	it('clearHistory очищает историю', () => {
		const context = setup()

		changeTitle(context, 'Продукты')
		changeTitle(context, 'Список')

		context.history.undo()

		expect(context.history.canUndo.value).toBe(true)
		expect(context.history.canRedo.value).toBe(true)

		context.history.clearHistory()

		expect(context.history.canUndo.value).toBe(false)
		expect(context.history.canRedo.value).toBe(false)
	})
})
