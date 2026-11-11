import type { Note, NoteCommand, Task } from '~/types'

import { HISTORY_LIMIT, NoteCommandType } from '~/constants'

export const useNoteHistory = (draft: Ref<Note>, limit = HISTORY_LIMIT) => {
	const undoStack = ref<NoteCommand[]>([])
	const redoStack = ref<NoteCommand[]>([])

	const findTask = (taskId: string) =>
		draft.value.tasks.find((task) => task.id === taskId)

	const insertTask = (task: Task, index: number) => {
		draft.value.tasks.splice(index, 0, { ...task })
	}

	const deleteTask = (taskId: string) => {
		const index = draft.value.tasks.findIndex((task) => task.id === taskId)
		if (index !== -1) {
			draft.value.tasks.splice(index, 1)
		}
	}

	const setTaskExists = (task: Task, index: number, shouldExist: boolean) => {
		if (shouldExist) {
			insertTask(task, index)
		} else {
			deleteTask(task.id)
		}
	}

	const applyCommand = (command: NoteCommand, isRevert = false) => {
		switch (command.type) {
			case NoteCommandType.SetTitle: {
				draft.value.title = isRevert ? command.oldValue : command.newValue
				break
			}
			case NoteCommandType.AddTask: {
				setTaskExists(command.task, command.index, !isRevert)
				break
			}
			case NoteCommandType.SetTaskLabel: {
				const task = findTask(command.taskId)
				if (task) {
					task.label = isRevert ? command.oldValue : command.newValue
				}
				break
			}
			case NoteCommandType.RemoveTask: {
				setTaskExists(command.task, command.index, isRevert)
				break
			}
			case NoteCommandType.ToggleTask: {
				const task = findTask(command.taskId)
				if (task) {
					task.done = !task.done
				}
				break
			}
		}
	}

	const recordCommand = (command: NoteCommand) => {
		undoStack.value.push(command)
		redoStack.value = []

		if (undoStack.value.length > limit) {
			undoStack.value.shift()
		}
	}

	const undo = () => {
		const command = undoStack.value.pop()

		if (!command) return

		redoStack.value.push(command)

		applyCommand(command, true)
	}

	const redo = () => {
		const command = redoStack.value.pop()

		if (!command) return

		undoStack.value.push(command)

		applyCommand(command)
	}

	const clearHistory = () => {
		undoStack.value = []
		redoStack.value = []
	}

	return {
		recordCommand,
		undo,
		redo,
		clearHistory,
	}
}
