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

export type TextCommitCallback = (values: NoteInputValues) => void
