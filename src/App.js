import React from 'react';
import './css/main.css';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: 19.196735,
			long: 72.95785599999999
		}
	}
	componentDidMount() {
		this.setCityName();
		let url = 'https://api.openweathermap.org/data/2.5/forecast?APPID=d1b207170c01f76d6654b8222324060e&lat=19.19&lon=72.95&units=metric&cnt=1';
		console.log(url)

		fetch(url)
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result)
					this.setState({
						isLoaded: true,
						city: result.city.name,
						country: result.city.country,
						windSpeed: result.list[0].wind.speed,
						windAngle: result.list[0].wind.deg,
						weatherMain: result.list[0].weather[0].main,
						weatherDesc: result.list[0].weather[0].description,
						weatherIcon: result.list[0].weather[0].icon,
						feels_like: result.list[0].main.feels_like,
						humidity: result.list[0].main.humidity,
						pressure: result.list[0].main.pressure,
						temp_max: result.list[0].main.temp_max,
						temp_min: result.list[0].main.temp_min,
					});
				},
				(error) => {
					this.setState({
						isLoaded: false,
						error: error
					});
				}
			)
	}

	setCityName() {
		let success = (position) => {
			let lat = position.coords.latitude;
			let long = position.coords.longitude;
			this.setState({
				lat,
				long
			})
		}

		let error = () => {
			console.log('Can not find your location. Setting default location to Thane!');
		}

		if (!navigator.geolocation) {
			console.log('Geolocation is not supported in your browser. Setting default location to Thane!');
		}
		else {
			navigator.geolocation.getCurrentPosition(success, error);
		}
	}

	render() {
		return (
			<div className="app-container">
				<span className="location"><i className="fa fa-map-marker-alt"></i>{this.state.city}, {this.state.country}</span>
				<div className="weather">
					<span><img className="weather-icon" src={`http://openweathermap.org/img/wn/` + this.state.weatherIcon + `@2x.png`} alt="" /></span>
					<div className="weather-condition-wrapper">
						<h1 className="weather-condition">{this.state.weatherMain}</h1>
						<span className="weather-description">{this.state.weatherDesc}</span>
					</div>
					<div className="temp-info">
						<span className="feels-like">Feels Like: {this.state.feels_like}°C</span>
						<div className="temp-min-max">
							<span className="temp-max"><i class="fas fa-temperature-high"></i> {this.state.temp_max}°C</span> -
							<span className="temp-min"><i class="fas fa-temperature-low"></i> {this.state.temp_min}°C</span>
						</div>
					</div>
					<div className="wind-info">
						<span><i class="fas fa-wind"></i> {this.state.windSpeed} <em>km/hr</em></span>
						<span><i class="fas fa-location-arrow"></i> {this.state.windAngle}°</span>
					</div>
				</div>
			</div>
		)
	}
}

export default App;
