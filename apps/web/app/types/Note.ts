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
