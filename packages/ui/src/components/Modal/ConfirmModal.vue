<script setup lang="ts">
	import type { ConfirmModalProps, ConfirmModalEmit } from './Modal.types'

	import Button from '../Buttons/Button.vue'
	import Modal from './Modal.vue'

	defineOptions({
		inheritAttrs: false,
	})

	const {
		title,
		content,
		to,
		headerTag,
		confirmText = 'Подтвердить',
		cancelText = 'Отмена',
	} = defineProps<ConfirmModalProps>()

	const emit = defineEmits<ConfirmModalEmit>()

	const model = defineModel<boolean>({ required: true })

	const confirm = () => {
		model.value = false
		emit('confirm')
	}

	const cancel = () => {
		model.value = false
		emit('cancel')
	}

	const onModalUpdate = (value: boolean | undefined) => {
		if (!value) cancel()
	}
</script>

<template>
	<Modal
		:model-value="model"
		:title="title"
		:content="content"
		:to="to"
		:header-tag="headerTag"
		@update:model-value="onModalUpdate"
	>
		<template #footer>
			<Button
				class="ui-modal-confirm-button"
				variant="secondary"
				autofocus
				@click="cancel"
			>
				{{ cancelText }}
			</Button>
			<Button class="ui-modal-confirm-button" @click="confirm">
				{{ confirmText }}
			</Button>
		</template>
	</Modal>
</template>

<style scoped lang="scss">
	.ui-modal-confirm-button {
		flex: 1 1 auto;
	}
</style>
