<script setup lang="ts">
	import type { HeaderTag } from './Modal.types'

	const { tag, id } = defineProps<{ tag: HeaderTag; id: string }>()
</script>

<template>
	<component :is="tag" :id="id" class="ui-modal-title text-heading-l">
		<slot />
	</component>
</template>

<style scoped lang="scss">
	.ui-modal-title {
		padding-right: var(--spacing-150);
	}
</style>
