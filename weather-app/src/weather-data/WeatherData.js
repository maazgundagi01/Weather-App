import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "./weather-data.css";
import blizzard from '../img/blizzard.jpg';
import cloudy from '../img/cloudy.jpg';
import fog from '../img/fog.jpg';
import heavyRain from '../img/heavy-rain.jpg';
import heavySnow from '../img/heavy-snow.jpg';
import lightning from '../img/lightning.jpg';
import mist from '../img/mist.jpg';
import partlyCloudy from '../img/partly-cloudy.jpg';
import rain from '../img/rain.jpg';
import sleet from '../img/sleet.jpg';
import snow from '../img/snow.jpg';
import stormy from '../img/stormy.jpg';
import sunny from '../img/sunny.jpg';
import SavedLocations from '../saved-locations/SavedLocations';

function WeatherData() {

    
    const [data, setData] = useState({
        "location": {
            "name": "",
            "country": ""
        },
        "current": {
            "condition": ""
        },
        "forecast": {
            "forecastday": [
                {
                    "day": {
                        "condition": {
                            "text": "",
                            "icon": ""
                        }
                    },
                    "hour": []
                }
            ]
        }
    });
    const LOCATION = useParams().location;
    const API_KEY = "e0e6ec95877448169b3215704221203";
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${LOCATION}&days=3&aqi=no&alerts=no`;

    const fetchData = () => {
        // Fetch the data from WeatherAPI
        fetch(API_URL)
            .then(function(receivedData) {
                return receivedData.json();
            })
            .then(function(receivedData) {
                setData(receivedData);
                console.log(data);
            })
            .catch((error) => {
                console.error(`Could not fetch data from API. ${error}`);
            });
    };
    useEffect(() => {
        fetchData()
        // localStorage.setItem("saved-locations", JSON.stringify([]));
    }, []);
    useEffect(() => {
        // Change background image depending on weather conditions
        var currentConditionsBackground = "";
        switch (data.current.condition.code) {
            case 1000:
                currentConditionsBackground = `url(${sunny})`;
                break;
            case 1003:
                currentConditionsBackground = `url(${partlyCloudy})`;
                break;
            case 1006 || 1009:
                currentConditionsBackground = `url(${cloudy})`;
                break;
            case 1030:
                currentConditionsBackground = `url(${mist})`;
                break;
            case 1063 || 1150 || 1153 || 1180 || 1183 || 1240:
                currentConditionsBackground = `url(${rain})`;
                break;
            case 1066 || 1210 || 1213 || 1216 || 1255:
                currentConditionsBackground = `url(${snow})`;
                break;
            case 1069 || 1072 ||1168 || 1171 || 1198 || 1201 || 1204 || 1207 || 1249 || 1252 || 1264:
                currentConditionsBackground = `url(${sleet})`;
                break;
            case 1087:
                currentConditionsBackground = `url(${stormy})`;
                break;
            case 1114 || 1117 || 1219 || 1258:
                currentConditionsBackground = `url(${heavySnow})`;
                break;
            case 1135 || 1147:
                currentConditionsBackground = `url(${fog})`;
                break;
            case 1189 || 1192 || 1195 || 1243 || 1246:
                currentConditionsBackground = `url(${heavyRain})`;
                break;
            case 1222 || 1225 || 1237:
                currentConditionsBackground = `url(${blizzard})`;
                break;
            case 1273 || 1276 || 1279 || 1282:
                currentConditionsBackground = `url(${lightning})`;
            default:
                currentConditionsBackground = "url('../img/sunny.jpg')";
                break;
        } 
        document.getElementById("current-conditions").style.backgroundImage = currentConditionsBackground;

        // set the state of the favourited button
        var savedLocations = JSON.parse(localStorage.getItem("saved-locations") || "[]");
        if (savedLocations) {
            savedLocations.map((el) => {
                if (el.includes(data.location.name) && el.includes(data.location.country)) {
                    document.getElementById("favourite").innerHTML = "Favourited!";
                }
            });
        }
    });
    
    function saveToLocalStorage() {
        let savedLocations = JSON.parse(localStorage.getItem("saved-locations") || "[]");
        console.log("Saved locations: ");
        console.log(savedLocations);

        if (savedLocations.length > 0) {
            savedLocations.map((el) => {
                // if already contained in local storage, remove
                if (el.includes(data.location.name) && el.includes(data.location.country)) {
                    savedLocations = savedLocations.filter(function(arr) {
                        return !(arr.includes(data.location.name) && arr.includes(data.location.country));
                    });
                    document.getElementById("favourite").innerHTML = "&#9733; Save as favourite";
                    console.log("Removed from favourites");
                } else { // if not contained in local storage, add
                    savedLocations.push([data.location.name, data.location.country]);
                    document.getElementById("favourite").innerHTML = "Favourited!";
                    console.log("Added to favourites");
                }
            });
        } else {
            savedLocations.push([data.location.name, data.location.country]);
            document.getElementById("favourite").innerHTML = "Favourited!";
        }

        localStorage.setItem("saved-locations", JSON.stringify(savedLocations));
    }

    return (
        <section id="weather-data">
            <div id="current-conditions">
                <img id="current-icon" src={data.current.condition.icon} alt={data.current.condition.text}/>
                <h1>{data.location.name}</h1>
                <h3>{data.location.country}</h3>

                <div id="temperature-container">
                    <div class="inner-temp-container">
                        <p>Feels like</p>
                        <p id="temperature">{Math.floor(data.current.feelslike_c)}&#176;</p>
                    </div>
                    <div class="inner-temp-container">
                        <p>Actual</p>
                        <p id="temperature">{Math.floor(data.current.temp_c)}&#176;</p>
                    </div>
                </div>

                <h3>{data.current.condition.text}</h3>
                <p>H:{Math.floor(data.forecast.forecastday[0].day.maxtemp_c)}&#176; L:{Math.floor(data.forecast.forecastday[0].day.mintemp_c)}&#176;</p>
            </div>

            <button id="favourite" onClick={saveToLocalStorage}>&#9733; Save as favourite</button>

            <div className="forecast-block">
                <h2>Rest of the day</h2>


                {/* Hourly forecast */}
                <div className="forecast-inner">
                {
                    data.forecast.forecastday[0].hour.map((el, i) => {
                        const currentDate = new Date();

                        if (i >= currentDate.getHours()) {
                            return (
                                <div className="forecast-unit-block">
                                    <p>{(i > 12) ? i - 12 : i}</p>
                                    <img src={el.condition.icon} />
                                    <p>{Math.floor(el.temp_c)}&#176;</p>
                                </div>
                            );
                        }
                    })
                }
                </div>
            </div>

            <div className="forecast-block">
                <h2>3-day forecast</h2>


                {/* 3 Day Forecast */}
                <div className="forecast-inner">
                {
                    data.forecast.forecastday.map((el, i) => {
                        return (
                            <div className="forecast-unit-block">
                                <h3>{(i === 0) ? "Today" : el.date}</h3>
                                <img src={el.day.condition.icon} />
                                <p>H:{Math.floor(el.day.maxtemp_c)}&#176; L:{Math.floor(el.day.mintemp_c)}&#176;</p>
                            </div>
                        );
                    })
                }
                </div>
            </div>

            <div className="forecast-multiple">
                <div className="forecast-block">
                    <h2>Wind</h2>
                    <p id="wind-speed">{data.current.wind_kph} km/h</p>
                    <p id="wind-direction">{data.current.wind_dir}</p>
                </div>
                <div id="humidity-block" className="forecast-block">
                    <h2>Humidity</h2>
                    <p id="humidity">{data.current.humidity}%</p>
                </div>
            </div>
        </section>
    );
}

export default WeatherData;