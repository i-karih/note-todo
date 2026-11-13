<script setup lang="ts">
	import type { CheckboxPrimitiveProps } from './Checkbox.types'

	const model = defineModel<boolean>()

	const { disabled = false, ariaLabel } = defineProps<CheckboxPrimitiveProps>()
</script>

<template>
	<label class="ui-checkbox-primitive">
		<input
			v-model="model"
			:disabled="disabled"
			:aria-label="ariaLabel"
			type="checkbox"
			class="ui-checkbox-primitive__input"
		/>
		<slot />
	</label>
</template>

<style scoped lang="scss">
	.ui-checkbox-primitive {
		&__input {
			@include visually-hidden;
		}
	}
</style>
