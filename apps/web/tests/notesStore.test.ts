import type { NoteStorage } from '~/types'
import { setActivePinia, createPinia } from 'pinia'
import { expect, afterEach, beforeEach, describe, it, vi } from 'vitest'

import { NOTES_SAVE_DELAY, NOTES_STORAGE_KEY } from '~/constants'
import { useNotesStore } from '~/stores/notes.ts'
import { createEmptyNote, saveDraft, loadDraft } from '~/utils'

const createStore = () => {
	setActivePinia(createPinia())
	return useNotesStore()
}

const readStorage = (): NoteStorage | null => {
	const raw = localStorage.getItem(NOTES_STORAGE_KEY)
	return raw ? JSON.parse(raw) : null
}

describe('notes store', () => {
	beforeEach(() => {
		localStorage.clear()
		vi.useFakeTimers()
	})
	afterEach(() => {
		vi.useRealTimers()
		vi.restoreAllMocks()
	})

	describe('работа с заметками', () => {
		it('добавляет новую заметку', () => {
			const store = createStore()
			const firstNote = createEmptyNote()
			const secondNote = createEmptyNote()

			store.saveNote(firstNote)
			store.saveNote(secondNote)

			expect(store.notes.map(({ id }) => id)).toEqual([
				secondNote.id,
				firstNote.id,
			])
		})

		it('обновляет существующую заметку на ее месте', () => {
			const store = createStore()
			const firstNote = createEmptyNote()
			const secondNote = createEmptyNote()
			const newTitle = 'Новый заголовок'

			store.saveNote(firstNote)
			store.saveNote(secondNote)
			store.saveNote({ ...firstNote, title: newTitle })

			expect(store.notes).toHaveLength(2)
			expect(store.notes[1]?.title).toBe(newTitle)
		})

		it('хранит копию заметки, а не ссылку на объект', () => {
			const store = createStore()
			const note = createEmptyNote()
			const title = 'Исходное'
			note.title = title

			store.saveNote(note)
			note.title = 'Изменено снаружи'

			expect(store.getNoteById(note.id)?.title).toBe(title)
		})

		it('удаляет заметку по id', () => {
			const store = createStore()
			const firstNote = createEmptyNote()
			const secondNote = createEmptyNote()

			store.saveNote(firstNote)
			store.saveNote(secondNote)

			store.removeNoteById(firstNote.id)

			expect(store.getNoteById(firstNote.id)).toBeUndefined()
			expect(store.getNoteById(secondNote.id)).toBeDefined()
		})

		it('при удалении заметки, удаляет и черновик', () => {
			const store = createStore()
			const firstNote = createEmptyNote()

			store.saveNote(firstNote)
			saveDraft(firstNote.id, firstNote)
			store.removeNoteById(firstNote.id)

			expect(loadDraft(firstNote.id)).toBeNull()
		})

		it('hasNotes показывает есть ли заметки', () => {
			const store = createStore()
			const firstNote = createEmptyNote()

			expect(store.hasNotes).toBe(false)

			store.saveNote(firstNote)

			expect(store.hasNotes).toBe(true)
		})
	})

	describe('сохранение в localStorage', () => {
		it('пишет не сразу, а после задержки', () => {
			const store = createStore()
			const firstNote = createEmptyNote()

			store.saveNote(firstNote)
			expect(readStorage()).toBeNull()

			vi.advanceTimersByTime(NOTES_SAVE_DELAY)

			expect(readStorage()).toMatchObject({
				version: expect.any(Number),
				notes: [firstNote],
			})
		})

		it('flushToStorage пишет сразу, не дожидаясь задержки', () => {
			const store = createStore()
			const firstNote = createEmptyNote()

			store.saveNote(firstNote)
			store.flushToStorage()

			expect(readStorage()?.notes).toHaveLength(1)
		})

		it('серия изменений дает одну запись в хранилище', () => {
			const setItem = vi.spyOn(localStorage, 'setItem')
			const store = createStore()
			const firstNote = createEmptyNote()

			store.saveNote(firstNote)
			store.saveNote(createEmptyNote())
			store.saveNote({ ...firstNote, title: 'Новое название' })

			vi.advanceTimersByTime(NOTES_SAVE_DELAY)

			const notesWrites = setItem.mock.calls.filter(
				([key]) => key === NOTES_STORAGE_KEY
			)
			expect(notesWrites).toHaveLength(1)
		})

		it('восстанавливает заметки после перезагрузки', () => {
			const store = createStore()
			const firstNote = createEmptyNote()

			store.saveNote(firstNote)
			store.flushToStorage()

			const reloaded = createStore()
			reloaded.getNotesFromStorage()

			expect(reloaded.notes.map(({ id }) => id)).toEqual([firstNote.id])
		})

		it('битые данные в хранилище не роняют загрузку', () => {
			localStorage.setItem(NOTES_STORAGE_KEY, '{oops')
			const store = createStore()

			expect(() => store.getNotesFromStorage()).not.toThrow()
			expect(store.notes).toEqual([])
		})
	})
})
