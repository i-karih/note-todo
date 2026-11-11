import type { Task } from './Note'

import { NoteCommandType } from '~/constants'

export type NoteCommand =
	| { type: NoteCommandType.SetTitle; oldValue: string; newValue: string }
	| { type: NoteCommandType.AddTask; task: Task; index: number }
	| { type: NoteCommandType.RemoveTask; task: Task; index: number }
	| {
			type: NoteCommandType.SetTaskLabel
			taskId: string
			oldValue: string
			newValue: string
	  }
	| { type: NoteCommandType.ToggleTask; taskId: string }
