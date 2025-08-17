import {weatherConditionCodes} from "../constants/weather-constants.js";
import {convertCelsiusToFahrenheit} from "../utils/weather-utils.js";

document.addEventListener("DOMContentLoaded", () => {
    loadWeatherIcons();
    loadTemperatures();
    loadLocationsOnMap();
});

const loadWeatherIcons = () => {
  // find classes with weather-icon and data-weather-code
  const weatherIconElements = document.querySelectorAll(".weather-icon");
  weatherIconElements.forEach((element) => {
    const weatherCode = element.dataset.weatherCode;
    const weatherCondition = weatherConditionCodes.find((code) => code.code == weatherCode);
    if (weatherCondition) {
      // Set the icon based on the weather code
      element.innerHTML = `<img src="/assets/imgs/weather-icons/${weatherCondition.icon}.svg" alt="${weatherCondition.description}" width="60" height="60">`;
      // Set the description is the next p sibling of the parent element
      const parent = element.parentNode;
      const descriptionElement = parent.nextElementSibling;
      if (descriptionElement) {
        descriptionElement.innerText = weatherCondition.description;
      }
    }
  });
}

const loadTemperatures = () => {
    const tempElements = document.querySelectorAll(".temperature");
    tempElements.forEach((element) => {
        const celsius = parseFloat(element.dataset.temp);
        if (!isNaN(celsius)) {
            const fahrenheit = convertCelsiusToFahrenheit(celsius);
            element.innerText = `${celsius}°C / ${fahrenheit.toFixed(2)}°F`;
        } else {
            const fahrenheit = convertCelsiusToFahrenheit(0);
            element.innerText = `${0}°C / ${fahrenheit.toFixed(2)}°F`;
        }
    });
}

const loadLocationsOnMap = () => {
  const stations = document.querySelectorAll(".station");
  if (stations.length === 0) return;
  var map = L.map("map");
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
  const markerCoords = [];

  stations.forEach((station) => {
    const latitude = station.querySelector(".latitude").innerText.split(": ")[1];
    const longitude = station.querySelector(".longitude").innerText.split(": ")[1];
    const name = station.querySelector(".name").innerText;
    console.log(`Adding marker for station at ${latitude}, ${longitude}`);
    const marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup(`<b>${name}</b>`);
    markerCoords.push([latitude, longitude]);
  });

  if (markerCoords.length > 0) {
    map.fitBounds(markerCoords);
  }

  const addStationForm = document.querySelector(".add-station-form");
  // find add-latitude, add-longitude inputs and auto fill on location click
  const latitudeInput = addStationForm.querySelector(".add-latitude");
  const longitudeInput = addStationForm.querySelector(".add-longitude");
  map.on("click", (e) => {
    const lat = e.latlng.lat.toFixed(6);
    const lng = e.latlng.lng.toFixed(6);
    latitudeInput.value = lat;
    longitudeInput.value = lng;
  });

}