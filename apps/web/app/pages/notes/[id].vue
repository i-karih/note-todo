<script setup lang="ts">
	import {
		UIInput,
		UICheckbox,
		UIButton,
		UIIconButton,
		UICard,
	} from '@note-todo/ui'

	import { useNoteEditor } from '~/composables/useNoteEditor.ts'

	const route = useRoute()
	const noteId = computed(() => String(route.params.id))

	const {
		isNew,
		isNotFound,
		errorNoteTitle,
		draft,
		addNewTaskForNote,
		removeTask,
		saveNote,
		removeNote,
		cancelEditNote,
	} = useNoteEditor(noteId)

	const title = computed(() =>
		isNew.value ? 'Создать новую заметку' : 'Редактировать заметку'
	)
</script>

<template>
	<section class="note-editor">
		<div v-if="!isNotFound" class="container-sm">
			<h1 class="note-editor__title text-display">
				{{ title }}
			</h1>

			<form
				class="note-editor__form note-editor-form"
				@submit.prevent="saveNote()"
			>
				<UICard>
					<template #header>
						<UIInput
							v-model="draft.title"
							:status="errorNoteTitle ? 'danger' : 'default'"
							:message="errorNoteTitle"
						>
							<template #label>
								<span class="text-heading-m">Заголовок</span>
							</template>
						</UIInput>
					</template>
					<div role="group" aria-labelledby="task-title">
						<h2 id="task-title" class="note-editor-form__title text-heading-m">
							Задачи
						</h2>
						<ul class="note-editor-form__tasks">
							<li
								v-for="(task, index) in draft.tasks"
								:key="task.id"
								class="note-editor-form__task"
							>
								<UICheckbox
									v-model="task.done"
									:aria-label="`Пункт ${index + 1} ${task.done ? 'выполнен' : 'не выполнен'}`"
								/>
								<UIInput
									v-model="task.label"
									class="note-editor-form__input"
									:aria-label="`Текст пункта ${index + 1}`"
								/>
								<UIIconButton
									name="trash"
									class="note-editor-form__delete"
									:aria-label="`Удалить пункт ${index + 1}`"
									@click="removeTask(task.id)"
								/>
							</li>
						</ul>
					</div>

					<div class="note-editor-form__add">
						<UIButton
							variant="secondary"
							class="note-editor-form__add-button"
							@click="addNewTaskForNote"
						>
							Добавить
						</UIButton>
					</div>
					<template #footer>
						<div class="note-editor-form__actions">
							<UIButton type="submit">Сохранить</UIButton>
							<UIButton variant="secondary" @click="cancelEditNote">
								Отменить
							</UIButton>
							<UIButton v-if="!isNew" variant="secondary" @click="removeNote">
								Удалить
							</UIButton>
						</div>
					</template>
				</UICard>
			</form>
		</div>
		<div v-else class="note-editor__empty">
			<UICard class="note-editor__empty-card empty-card">
				<template #card>
					<span>Такой заметки не существует</span>
					<UIButton to="/" class="empty-card__button"> На главную </UIButton>
				</template>
			</UICard>
		</div>
	</section>
</template>

<style scoped lang="scss">
	.note-editor {
		&__form {
			margin-top: var(--spacing-600);
		}

		&__empty {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 var(--spacing-200);
			height: 100%;

			&-card {
				text-align: center;
				width: 100%;
				max-width: 768px;
			}
		}
	}
	.note-editor-form {
		&__title {
			margin-bottom: var(--spacing-100);
		}
		&__tasks {
			display: flex;
			flex-direction: column;
			gap: var(--spacing-300);
			margin-bottom: var(--spacing-400);
		}

		&__task {
			display: flex;
			align-items: center;
			gap: var(--spacing-200);
		}

		&__input {
			width: 100%;
		}

		&__add {
			&-button {
				width: 100%;
			}
		}

		&__delete {
			flex-shrink: 0;
		}

		&__actions {
			display: flex;
			gap: var(--spacing-200);
			justify-content: flex-end;
		}
	}

	.empty-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		max-width: 768px;
		width: 100%;

		&__button {
			width: 100%;
		}
	}
</style>
