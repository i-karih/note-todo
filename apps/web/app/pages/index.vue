<script setup lang="ts">
	import { UICard, UIIconButton, UIButton } from '@note-todo/ui'

	import { useConfirm } from '~/composables'
	import { useNotesStore } from '~/stores/notes.ts'

	const confirm = useConfirm()
	const notesStore = useNotesStore()

	const removeNote = (id: string) => {
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
				<UIIconButton name="plus" variant="primary" to="/notes/new" />
			</div>
			<div v-if="notesStore.isEmptyNotes" class="todo__list">
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
							<UIIconButton name="edit" :to="`/notes/${note.id}`" />
						</div>
					</template>

					<template #default>
						<ul class="todo-card__list">
							<li
								v-for="task in note.tasks"
								:key="task.id"
								:class="[
									'todo-card__item',
									'text-body-m',
									{ 'todo-card__item--done': task.done },
								]"
								class=""
							>
								{{ task.label }}
							</li>
						</ul>
					</template>

					<template #footer>
						<UIButton
							variant="secondary"
							class="todo-card__delete"
							@click="removeNote(note.id)"
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
			display: flex;
			gap: var(--spacing-200);
		}

		&__card {
			width: 100%;
			max-width: 300px;
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
		}

		&__delete {
			width: 100%;
		}
	}
</style>
