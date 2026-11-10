import { useConfirmStore } from '~/stores/confirm.ts'

export const useConfirm = () => useConfirmStore().open
