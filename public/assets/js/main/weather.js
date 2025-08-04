import {weatherConditionCodes} from "../constants/weather-constants.js";
import {convertCelsiusToFahrenheit} from "../utils/weather-utils.js";

document.addEventListener("DOMContentLoaded", () => {
    loadWeatherIcons();
    loadTemperatures();

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
