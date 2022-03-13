import React, { Component, useEffect, useState } from 'react';
import Axios from "axios";

export default function WeatherData() {
    const [data, setData] = useState([]);
    const API_KEY = "e0e6ec95877448169b3215704221203";

    const fetchData = async () => {
        // get information from local database
        // used for saved locations
        // const response = await Axios("api-url");
        // setData(response.data);
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=e0e6ec95877448169b3215704221203&q=London&aqi=no`;

        // Fetch the data from WeatherAPI
        fetch(apiUrl)
            .then(function(data) {
                return data.json();
            })
            .then(function(data) {
                console.log(data);
            })
            .catch((error) => {
                console.error(`Could not fetch data from API. ${error}`);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);
    

    return(
        <section id="weather-data">
        </section>
    );
}