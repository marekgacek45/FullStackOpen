import { useState } from 'react'

const App = () => {
	const anecdotes = [
		'If it hurts, do it more often.',
		'Adding manpower to a late software project makes it later!',
		'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
		'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
		'Premature optimization is the root of all evil.',
		'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
		'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
		'The only way to go fast, is to go well.',
	]

	const getRandomIndex = () => {
		return Math.floor(Math.random() * anecdotes.length)
	}

	const handleNextAnecdote = () => {
		setSelected(prev => {
			if (prev === anecdotes.length - 1) {
				return 0
			} else {
				return prev + 1
			}
		})
	}

	const [selected, setSelected] = useState(getRandomIndex())
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

	const handleVote = () => {
		setVotes(prev => {
			const updateVotes = [...prev]
			updateVotes[selected] += 1
			return updateVotes
		})
	}

	const highestVotedIndex = votes.indexOf(Math.max(...votes))

	return (
		<>
			<div>
				<h1>Anectode of the day</h1>
				{anecdotes[selected]}
			</div>
			<p>has {votes[selected]} votes</p>
			<button onClick={handleVote}>Vote</button>
			<button onClick={handleNextAnecdote}>Next anegdote</button>
			{votes[highestVotedIndex] > 0 && (
				<div>
					<h2>Anecdote with the most votes</h2>
					{anecdotes[highestVotedIndex]}
				</div>
			)}
		</>
	)
}

export default App
