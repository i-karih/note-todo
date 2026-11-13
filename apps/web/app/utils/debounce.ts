export const debounce = <Args extends unknown[]>(
	fn: (...args: Args) => void,
	delay: number
) => {
	let timer: ReturnType<typeof setTimeout> | undefined
	let pendingArgs: Args | undefined

	const debounced = (...args: Args) => {
		pendingArgs = args
		clearTimeout(timer)
		timer = setTimeout(debounced.flush, delay)
	}

	debounced.cancel = () => {
		clearTimeout(timer)
		pendingArgs = undefined
	}

	debounced.flush = () => {
		clearTimeout(timer)
		if (!pendingArgs) return
		const args = pendingArgs
		pendingArgs = undefined
		fn(...args)
	}

	return debounced
}
