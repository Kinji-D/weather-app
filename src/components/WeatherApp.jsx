/* Weather App By: Kinji Donald, created for PM Accelerator assessment */

import { useEffect, useState } from 'react';
import sun from "../assets/images/sunny.png";
import cloud from "../assets/images/cloudy.png";
import rain from "../assets/images/raining.png";
import snow from "../assets/images/snowing.png";
import sun_sky from "../assets/images/sunny_sky.jpg";
import cloud_sky from "../assets/images/cloudy_sky.jpg";
import rain_sky from "../assets/images/rainy_sky.jpg";
import snow_sky from "../assets/images/snowy_sky.jpg";
import haze from "../assets/images/haze_sky.png";

const WeatherApp = () => {
    const [data, setData] = useState({}); //weather data
    const [location, setLocation] = useState('New York'); 
    const [unit, setUnit] = useState('Imperial');
    const [celsius, setCelsius] = useState();
    const [fahrenheit, setFahrenheit] = useState("#94918d");
    const [info, setInfo] = useState(false);
    const api_key = '2c2ae90b942d09670c9128cc635c6e23';

    //Default weather displayed as New York (my city) ideally would be set to user location
    useEffect(() => {
        const fetchDefaultWeather = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Imperial&appid=${api_key}`
            const res = await fetch(url)
            const defaultData = await res.json()
            setData(defaultData)
        }

        fetchDefaultWeather()
    }, [])

    //Set location to the given location
    const handleInputChange = (e) => {
        setLocation(e.target.value)
    }

    //Get weather data from API
    const search = async () => {
        if(location.trim() !== "") {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${api_key}`
            const res = await fetch(url)
            const searchData = await res.json()
            if(searchData.cod !== 200) {
                setData({notFound: true})
            } else {
                setData(searchData)
            }
        }
    }

    //Allow pressing enter to search
    const handleKeyDown = (e) => {
        if(e.key === "Enter"){
            search()
        }
    }

    //Change Temperature Unit to fahrenheit (have to grab new data from API to avoid doing direct conversion)
    const changeUnitImperial = async () => {
        if(location.trim() !== "") {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Imperial&appid=${api_key}`
            const res = await fetch(url)
            const searchData = await res.json()
            if(searchData.cod !== 200) {
                setData({notFound: true})
            } else {
                setData(searchData)
                setUnit("Imperial")
                setFahrenheit("#94918d")
                setCelsius('')
            }
        }
    }
    //Change Temperature Unit to celsius
    const changeUnitMetric = async () => {
        if(location.trim() !== "") {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`
            const res = await fetch(url)
            const searchData = await res.json()
            if(searchData.cod !== 200) {
                setData({notFound: true})
            } else {
                setData(searchData)
                setUnit("Metric")
                setCelsius("#94918d")
                setFahrenheit('')
            }
        }
    }

    //Change the weather image based on the weather
    const weatherImages = {
        Clear: sun,
        Clouds: cloud,
        Rain: rain,
        Snow: snow,
        Haze: cloud,
        Mist: cloud,
    }

    const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null;

    //Change background image depending on the weather
    const backgroundImages = {
        Clear: sun_sky,
        Clouds: cloud_sky,
        Rain: rain_sky,
        Snow: snow_sky,
        Haze: haze,
        Mist: haze,
    }

    const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] : 'linear-gradient(to right, #f3b07c, #fcd283)';

    //Change app background colors depending on the weather
    const appbackgroundImages = {
        Clear: 'linear-gradient(to top, #539cd4, #EFD713)',
        Clouds: 'linear-gradient(to top, #539cd4, #efeae9)',
        Rain: 'linear-gradient(to top, #2f3437, #d6d2ce)',
        Snow: 'linear-gradient(to top, #aff2ff, #fff)',
        Haze: 'linear-gradient(to top, #fde483, #b4945f)',
        Mist: 'linear-gradient(to top, #fde483, #b4945f)',
    }

    const appbackgroundImage = data.weather ? appbackgroundImages[data.weather[0].main] : 'linear-gradient(to right, #f3b07c, #fcd283)';

    //Handle Date
    const currentDate = new Date()
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

    //Grab indexes of days and months
    const dayOfWeek = daysOfWeek[currentDate.getDay()]
    const month = months[currentDate.getMonth()]
    const dayOfMonth = currentDate.getDate()

    //Format Date
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`

    //Toggles info popup
    const toggleInfo = () => {
        setInfo(!info)
    }

  return (
    <div className="container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
        <div className="info">
            <h1>By: Kinji Donald</h1>
            <p>Powered by: PM Accelorator <i className="fa-solid fa-circle-info" onClick={toggleInfo}></i></p>
        </div>
        {info && (
        <div className="info-popup">
            <div className="overlay" onClick={toggleInfo}></div>
            <div className="popup-content">
                <h1>PM Accelorator</h1>
                <p>The Product Manager Accelerator Program is designed to support PM professionals through every stage of their career. 
                    From students looking for entry-level jobs to Directors looking to take on a leadership role, our program has helped 
                    over hundreds of students fulfill their career aspirations. <br />
                    <br />
                    Our Product Manager Accelerator community are ambitious and committed. Through our program they have learnt, honed and developed 
                    new PM and leadership skills, giving them a strong foundation for their future endeavours.
                </p>
                <i class="fa-solid fa-circle-xmark" onClick={toggleInfo}></i>
            </div>
        </div>
        )}
        <div className="weather-app" style={{ backgroundImage: appbackgroundImage}}>
            <div className="search">
                <div className="location">
                <i className="fa-solid fa-location-dot"></i>
                <div className="location">{data.name}</div>
                <div className="units">
                    <p className="celsius" style={{ backgroundColor: celsius }} onClick={changeUnitMetric}>C°</p>
                    <p>|</p>
                    <p className="fahrenheit" style={{ backgroundColor: fahrenheit }} onClick={changeUnitImperial}>F°</p>
                </div>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Enter Location" onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                    <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
                </div>
            </div>
            {data.notFound ? (<div className="not-found">Not Found 😢</div>) : (
                <><div className="weather">
                <img src={weatherImage} alt={weatherImage} />
                <div className="weather-type">{data.weather ? data.weather[0].main: null}</div>
                <div className="temperature">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>
                <div className="min-max-temperature">H:{data.main ? `${Math.floor(data.main.temp_max)}°` : null} L:{data.main ? `${Math.floor(data.main.temp_min)}°` : null}</div>
            </div>
            <div className="date">
                <p>{formattedDate}</p>
            </div>
            <div className="weather-info">
            <div className="weather-info-block">
                <div className="humidity">
                    <div className="data-name">Humidity</div>
                    <i className="fa-solid fa-droplet"></i>
                    <div className="data">{data.main ? data.main.humidity: null}%</div>
                </div>
                <div className="feels-like">
                    <div className="data-name">Feels Like</div>
                    <i className="fa-solid fa-temperature-three-quarters"></i>
                    <div className="data">{data.main ? `${Math.floor(data.main.feels_like)}°`: null}</div>
                </div>
            </div>
            <div className="weather-info-block2">
                <div className="wind">
                    <div className="data-name">Wind</div>
                    <i className="fa-solid fa-wind"></i>
                    <div className="data">{data.wind ? data.wind.speed: null} mph</div>
                </div>
                <div className="visibility">
                    <div className="data-name">Visibility</div>
                    <i className="fa-solid fa-eye"></i>
                    <div className="data">{data.visibility ? `${Math.floor(data.visibility/1609)} mi`: null}</div>
                </div>
            </div>
            </div>
            </>
            )}
        </div>
    </div>
  )
}

export default WeatherApp