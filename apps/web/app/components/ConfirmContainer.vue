<script setup lang="ts">
	import { UIConfirmModal } from '@note-todo/ui'

	import { useConfirmStore } from '~/stores/confirm.ts'

	const confirmStore = useConfirmStore()
</script>

<template>
	<UIConfirmModal
		:model-value="confirmStore.isModalOpen"
		:title="confirmStore.options?.title"
		:content="confirmStore.options?.content"
		:to="confirmStore.options?.to"
		:header-tag="confirmStore.options?.headerTag"
		:confirm-text="confirmStore.options?.confirmText"
		:cancel-text="confirmStore.options?.cancelText"
		@confirm="confirmStore.confirm"
		@cancel="confirmStore.cancel"
	/>
</template>
