<script setup lang="ts">
	import { UICard, UIIconButton, UIButton } from '@note-todo/ui'

	import { useConfirm } from '~/composables'
	import { NOTE_PREVIEW_TASKS } from '~/constants'
	import { useNotesStore } from '~/stores/notes.ts'

	const confirm = useConfirm()
	const notesStore = useNotesStore()

	const handleRemoveNote = (id: string) => {
		confirm({
			title: 'Удалить заметку?',
			content: 'Это действие нельзя отменить.',
			confirmText: 'Удалить',
			onConfirm: () => notesStore.removeNoteById(id),
		})
	}
</script>

<template>
	<section class="todo">
		<div class="container">
			<div class="todo__header">
				<h1 class="todo__title text-display">Мои заметки</h1>
				<UIIconButton
					aria-label="Создать заметку"
					name="plus"
					variant="primary"
					to="/notes/new"
				/>
			</div>
			<div v-if="notesStore.hasNotes" class="todo__list">
				<UICard
					v-for="note in notesStore.notes"
					:key="note.id"
					size="medium"
					class="todo-card todo__card"
				>
					<template #header>
						<div class="todo-card__header">
							<h2 class="todo-card__title text-heading-m">
								{{ note.title }}
							</h2>
							<UIIconButton
								:aria-label="`Редактировать заметку ${note.title}`"
								name="edit"
								:to="`/notes/${note.id}`"
							/>
						</div>
					</template>

					<template #default>
						<ul class="todo-card__list">
							<li
								v-for="task in note.tasks.slice(0, NOTE_PREVIEW_TASKS)"
								:key="task.id"
								:class="[
									'todo-card__item',
									'text-body-m',
									{ 'todo-card__item--done': task.done },
								]"
							>
								{{ task.label }}
							</li>
							<li
								v-if="note.tasks.length > NOTE_PREVIEW_TASKS"
								class="todo-card__item todo-card__item--muted text-body-s"
							>
								и еще {{ note.tasks.length - NOTE_PREVIEW_TASKS }}
							</li>
						</ul>
					</template>

					<template #footer>
						<UIButton
							:aria-label="`Удалить заметку ${note.title}`"
							variant="secondary"
							class="todo-card__delete"
							@click="handleRemoveNote(note.id)"
						>
							Удалить
						</UIButton>
					</template>
				</UICard>
			</div>
			<div v-else class="todo__empty">
				<UICard class="todo__empty-card">
					<template #card>
						Заметок еще нет, их можно добавить нажав на кнопку добавить
					</template>
				</UICard>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
	.todo {
		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: var(--spacing-200);
			margin-bottom: var(--spacing-400);
		}
		&__title {
			text-transform: uppercase;
		}
		&__list {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
			gap: var(--spacing-200);

			@include md {
				grid-template-columns: repeat(3, 1fr);
			}
		}

		&__card {
			width: 100%;
		}

		&__empty {
			&-card {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}

	.todo-card {
		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: var(--spacing-100);
		}

		&__list {
			display: flex;
			flex-direction: column;
			gap: var(--spacing-50);
		}
		&__item {
			&--done {
				text-decoration: line-through;
			}
			&--muted {
				text-align: right;
				color: var(--text-muted);
			}
		}

		&__delete {
			width: 100%;
		}
	}
</style>
