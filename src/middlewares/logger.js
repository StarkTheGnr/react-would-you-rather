
const logger = (store) => (next) => (action) => {
	console.group(action.type)

	console.log("The action: ", action)
	const output = next(action)
	console.log("The new state: ", store.getState())

	console.groupEnd()

	return output
}

export default logger