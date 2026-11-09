<script setup lang="ts">
	const model = defineModel<boolean>()

	const { disabled = false } = defineProps<{ disabled?: boolean }>()
</script>

<template>
	<label class="ui-checkbox-primitive">
		<input
			v-model="model"
			:disabled="disabled"
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