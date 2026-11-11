export enum NoteCommandType {
	SetTitle = 'setTitle',
	AddTask = 'addTask',
	RemoveTask = 'removeTask',
	SetTaskLabel = 'setTaskLabel',
	ToggleTask = 'toggleTask',
}

export const HISTORY_LIMIT = 50
export const HISTORY_DEBOUNCE_DELAY = 700
