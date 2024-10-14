import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
	const [countries, setCountries] = useState([])
	const [filterCountries, setFilterCountries] = useState([])
	const [search, setSearch] = useState('')
	const [error, setError] = useState(null)

	// State to store the visibility of country info
	const [visibleCountryId, setVisibleCountryId] = useState(null)

	// Weather state
	const [weather, setWeather] = useState({})

	useEffect(() => {
		// Fetch countries data
		axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(res => {
			setCountries(res.data)
		})
	}, [])

	useEffect(() => {
		// Filter countries based on the search input
		const filtered = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
		setFilterCountries(filtered)

		// Handle error when there are too many results
		if (filtered.length > 10 && search !== '') {
			setError('Too many results')
		} else {
			setError(null)
		}

		// Automatically show info if only one country matches the search
		if (filtered.length === 1) {
			setVisibleCountryId(filtered[0].cca3)
			// Fetch weather for the capital
			checkWeather(filtered[0].capital[0]) // Use capital city
		} else {
			setVisibleCountryId(null)
		}
	}, [search, countries])

	// Function to toggle visibility for specific country
	const toggleShowInfo = countryId => {
		const selectedCountry = countries.find(country => country.cca3 === countryId)

		if (visibleCountryId === countryId) {
			setVisibleCountryId(null) // Hide if currently visible
		} else {
			setVisibleCountryId(countryId) // Show only for the selected country
			// Fetch weather for the capital
			checkWeather(selectedCountry.capital[0]) // Use capital city
		}
	}

	// Fetch weather function
	const checkWeather = city => {
		const API_KEY = import.meta.env.VITE_API_KEY
		const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

		

		axios
			.get(
				`
				${API_BASE_URL}data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`
			)
			.then(res => {
				setWeather({
					temp: res.data.main.temp,
					icon: res.data.weather[0].icon,
					wind: res.data.wind.speed,
				})
			})
			.catch(error => {
				console.error('Error fetching weather data', error)
			})
	}

	return (
		<>
			<div>
				<label htmlFor='search'>find countries</label>
				<input type='text' name='search' value={search} onChange={e => setSearch(e.target.value)} />
			</div>

			{error && <p>{error}</p>}

			{/* Display results only when there are fewer than 10 */}
			{filterCountries.length <= 10 &&
				filterCountries.map(country => (
					<div key={country.cca3}>
						<div className='country__name'>
							<h2>{country.name.common}</h2>

							{/* Show button only if more than one country */}
							{filterCountries.length > 1 && (
								<button onClick={() => toggleShowInfo(country.cca3)}>
									{visibleCountryId === country.cca3 ? 'hide' : 'show'}
								</button>
							)}
						</div>

						{/* Show info if only one country or "show" button is clicked */}
						{(visibleCountryId === country.cca3 || filterCountries.length === 1) && (
							<div className='active'>
								<p>capital: {country.capital}</p>
								<p>area: {country.area} km²</p>

								<h3>languages:</h3>
								<ul>
									{Object.values(country.languages).map(language => (
										<li key={language}>{language}</li>
									))}
								</ul>

								<img src={country.flags.svg} alt={country.flag.alt} style={{ width: '200px' }} />

								<h3>Weather in {country.capital[0]}</h3>
								<p>Temperature: {weather.temp} °C</p>
								<img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt='weather icon' />
								<p>Wind: {weather.wind} m/s</p>
							</div>
						)}
					</div>
				))}
		</>
	)
}

export default App
