import { windDirections } from "../constants/weather-constants.js";


document.addEventListener("DOMContentLoaded", function () {
    console.log("Weather constants loaded");
    showReportsWindDirections();
    loadWindDirectionDropDown();
});

const loadWindDirectionDropDown = () => {
    const windDirectionSelect = document.querySelector("select[name='windDirection']");
    if (windDirectionSelect) {
        windDirections.forEach(direction => {
            const option = document.createElement("option");
            option.value = direction.degrees;
            option.textContent = `${direction.direction} (${direction.degrees}°)`;
            windDirectionSelect.appendChild(option);
        });
    }
}

const showReportsWindDirections = () => {
    const reportWindDirectionElements = document.querySelectorAll(".report-wind-direction");
    reportWindDirectionElements.forEach(element => {
        const windDirectionInDegrees = element.dataset.windDirection;
        const direction = windDirections.find(dir => dir.degrees == windDirectionInDegrees);
        if (direction) {
            element.textContent = direction.direction;
        } else {
            // find the closest direction
            const closestDirection = windDirections.reduce((prev, curr) => {
                return (Math.abs(curr.degrees - windDirectionInDegrees) < Math.abs(prev.degrees - windDirectionInDegrees) ? curr : prev);
            });
            element.textContent = closestDirection.direction;
        }
    });
}
