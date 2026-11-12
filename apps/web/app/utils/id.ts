export const createId = (length = 12) => {
	const bytes = crypto.getRandomValues(new Uint8Array(length / 2))
	return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join(
		''
	)
}
