export type Task = {
	id: string
	label: string
	done: boolean
}

export type Note = {
	id: string
	title: string
	tasks: Task[]
}

export type NoteInputValues = {
	id?: string
	oldValue: string
	newValue: string
}

export type NoteStorage = {
	version: number
	notes: Note[]
}

export type NoteDraftStorage = {
	version: number
	savedAt: number
	note: Note
}

export type TextCommitCallback = (values: NoteInputValues) => void
