import React, { useEffect, useState } from 'react';
import "./weather-data.css";
import Axios from "axios";
import { useNavigate, useParams, NavLink } from "react-router-dom";
export default function WeatherData() {
    let { location } = useParams();

    const [data, setData] = useState({});
    const API_KEY = "e0e6ec95877448169b3215704221203";

    const fetchData = async () => {
        // get information from local database
        // used for saved locations
        // const response = await Axios("api-url");
        // setData(response.data);
        const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=London&days=10&aqi=no&alerts=no`;

        // Fetch the data from WeatherAPI
        fetch(apiUrl)
            .then(function(receivedData) {
                return receivedData.json();
            })
            .then(function(receivedData) {
                setData(() => ({
                    ...receivedData
                }));
                console.log(data);
            })
            .catch((error) => {
                console.error(`Could not fetch data from API. ${error}`);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);
    



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
                            return(
                                <div className="hourly-forecast-hour">
                                    <p>{(i > 12) ? i - 12 : i}</p>
                                    <img src={el.condition.icon}/>
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
                        return(
                            <div className="3-day-forecast-day">
                                <h3>{(i === 0) ? "Today" : el.date}</h3>
                                <img src={el.day.condition.icon}/>
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