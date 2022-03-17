import React, { useEffect, useState, useRef, Component } from 'react';
import { useNavigate, useParams, NavLink } from "react-router-dom";
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
import Axios from "axios";

function WeatherData() {

    
    const [data, setData] = useState({
        "location": {
            "name": ""
        },
        "current": {
            "condition": ""
        },
        "forecast": {
            "forecastday": [
                {
                    "day": {
                        "condition": {
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
        // get information from local database
        // used for saved locations
        // const response = await Axios("api-url");
        // setData(response.data);

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
        fetchData();
    }, []);
    useEffect(() => {
        // Change background image depending on weather conditions
        var weatherDataBackground = "";
        switch (data.current.condition.code) {
            case 1000:
                weatherDataBackground = `url(${sunny})`;
                break;
            case 1003:
                weatherDataBackground = `url(${partlyCloudy})`;
                break;
            case 1006 || 1009:
                weatherDataBackground = `url(${cloudy})`;
                break;
            case 1030:
                weatherDataBackground = `url(${mist})`;
                break;
            case 1063 || 1150 || 1153 || 1180 || 1183 || 1240:
                weatherDataBackground = `url(${rain})`;
                break;
            case 1066 || 1210 || 1213 || 1216 || 1255:
                weatherDataBackground = `url(${snow})`;
                break;
            case 1069 || 1072 ||1168 || 1171 || 1198 || 1201 || 1204 || 1207 || 1249 || 1252 || 1264:
                weatherDataBackground = `url(${sleet})`;
                break;
            case 1087:
                weatherDataBackground = `url(${stormy})`;
                break;
            case 1114 || 1117 || 1219 || 1258:
                weatherDataBackground = `url(${heavySnow})`;
                break;
            case 1135 || 1147:
                weatherDataBackground = `url(${fog})`;
                break;
            case 1189 || 1192 || 1195 || 1243 || 1246:
                weatherDataBackground = `url(${heavyRain})`;
                break;
            case 1222 || 1225 || 1237:
                weatherDataBackground = `url(${blizzard})`;
                break;
            case 1273 || 1276 || 1279 || 1282:
                weatherDataBackground = `url(${lightning})`;
            default:
                weatherDataBackground = "url('../img/sunny.jpg')";
                break;
        } 
        document.body.style.backgroundImage = weatherDataBackground;
    });
    


    return (

        <section id="weather-data">
            <h1>{location}</h1>
            <div id="current-conditions">
                <img src={data.current.condition.icon} />
                <h1>{data.location.name}</h1>
                <p>Feels like</p>
                <p id="temperature">{Math.floor(data.current.feelslike_c)}&#176;</p>
                <p>Actual temperature: {Math.floor(data.current.temp_c)}&#176;</p>
                <p>{data.current.condition.text}</p>
                <p>H:{Math.floor(data.forecast.forecastday[0].day.maxtemp_c)}&#176; L:{Math.floor(data.forecast.forecastday[0].day.mintemp_c)}&#176;</p>
            </div>
            <div id="hourly-forecast">
                <h2>Rest of the day</h2>


                {/* Hourly forecast */}
                {
                    data.forecast.forecastday[0].hour.map((el, i) => {
                        const currentDate = new Date();

                        if (i >= currentDate.getHours()) {
                            return (
                                <div className="hourly-forecast-hour">
                                    <p>{(i > 12) ? i - 12 : i}</p>
                                    <img src={el.condition.icon} />
                                    <p>{Math.floor(el.temp_c)}&#176;</p>
                                </div>
                            );
                        }
                    })
                }
            </div>

            <div id="3-day-forecast">
                <h2>3-day forecast</h2>


                {/* 3 Day Forecast */}
                {
                    data.forecast.forecastday.map((el, i) => {
                        return (
                            <div className="3-day-forecast-day">
                                <h3>{(i === 0) ? "Today" : el.date}</h3>
                                <img src={el.day.condition.icon} />
                                <p>H:{Math.floor(el.day.maxtemp_c)}&#176; L:{Math.floor(el.day.mintemp_c)}&#176;</p>
                            </div>
                        );
                    })
                }
            </div>


            <div id="wind">
                <h2>Wind</h2>
                <p id="wind-speed">{data.current.wind_kph} km/h</p>
                <p id="wind-direction">{data.current.wind_dir}</p>
            </div>

            <div id="humidity">
                <h2>Humidity</h2>
                <p>{data.current.humidity}%</p>
            </div>
        </section>
    );
}

export default WeatherData;