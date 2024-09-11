const Total = ({ parts }) => {
	const totalExercises = parts.reduce((s, p) => {
		return s + p.exercises
	}, 0)

	return <strong>total of {totalExercises} exercises</strong>
}

export default Total
