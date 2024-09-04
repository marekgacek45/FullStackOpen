import { useState } from 'react'

const Button = props => {
	return <button onClick={props.onClick}>{props.text}</button>
}

const StaticticLine = props => {
	return (
		<>
			<tr>
				<td> {props.text}</td>
				<td> {props.value}</td>
			</tr>
		</>
	)
}

const Statistics = props => {
  const average = (1 * props.good + 0 * props.neutral + (-1) * props.bad) / props.all;

	const roundedAverage = Math.floor(average * 10) / 10

	const positiveScore = (props.good / props.all) * 100 

	const roundedPositiveScore = (Math.floor(positiveScore * 10) / 10) +  '%'

	return (
		<div>
			<h2>Statistics</h2>

			<table>
				<tbody>
					<StaticticLine text='good' value={props.good} />
					<StaticticLine text='neutral' value={props.neutral} />
					<StaticticLine text='bad' value={props.bad} />
					<StaticticLine text='all' value={props.all} />
					<StaticticLine text='average' value={roundedAverage} />
					<StaticticLine text='positive' value={roundedPositiveScore} />
				</tbody>
			</table>
		</div>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [all, setAll] = useState(0)

	const handleGoodClick = () => {
		setAll(all + 1)
		setGood(good + 1)
	}

	const handleNeutralClick = () => {
		setAll(all + 1)
		setNeutral(neutral + 1)
	}

	const handleBadClick = () => {
		setAll(all + 1)
		setBad(bad + 1)
	}

	return (
		<>
			<div>
				<h1>Give Feedback</h1>
				<Button onClick={handleGoodClick} text='good' />
				<Button onClick={handleNeutralClick} text='neutral' />
				<Button onClick={handleBadClick} text='bad' />
			</div>

			{all > 0 ? <Statistics all={all} good={good} neutral={neutral} bad={bad} /> : <p>No feedback given</p>}
		</>
	)
}

export default App
