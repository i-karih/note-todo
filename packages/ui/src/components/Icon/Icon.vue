<script setup lang="ts">
	import type { IconName, IconProps, IconSize } from './Icon.types'
	import { computed, type Component } from 'vue'

	import IconArrowLeft from './icons/IconArrowLeft.vue'
	import IconCheck from './icons/IconCheck.vue'
	import IconCircle from './icons/IconCircle.vue'
	import IconClose from './icons/IconClose.vue'
	import IconEdit from './icons/IconEdit.vue'
	import IconPlus from './icons/IconPlus.vue'
	import IconTrash from './icons/IconTrash.vue'

	const { name, size = 'medium' } = defineProps<IconProps>()

	const iconsMap: Record<IconName, Component> = {
		check: IconCheck,
		circle: IconCircle,
		plus: IconPlus,
		trash: IconTrash,
		edit: IconEdit,
		'arrow-left': IconArrowLeft,
		close: IconClose,
	}

	const sizeMap: Record<IconSize, number> = {
		small: 16,
		medium: 20,
		large: 24,
	}

	const computedSize = computed(() => sizeMap[size])
</script>

<template>
	<component
		:is="iconsMap[name]"
		:size="computedSize"
		class="ui-icon"
		aria-hidden="true"
	/>
</template>

<style scoped lang="scss">
	.ui-icon {
		display: inline-block;
		flex-shrink: 0;
		vertical-align: middle;
	}
</style>
