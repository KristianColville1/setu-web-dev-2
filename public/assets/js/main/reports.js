import { windDirections } from "../constants/weather-constants.js";

document.addEventListener("DOMContentLoaded", function () {
  console.log("Weather constants loaded");
  showReportsWindDirections();
  loadWindDirectionDropDown();
  loadTemperatureChart();
});

const loadWindDirectionDropDown = () => {
  const windDirectionSelect = document.querySelector("select[name='windDirection']");
  if (windDirectionSelect) {
    windDirections.forEach((direction) => {
      const option = document.createElement("option");
      option.value = direction.degrees;
      option.textContent = `${direction.direction} (${direction.degrees}°)`;
      windDirectionSelect.appendChild(option);
    });
  }
};

const showReportsWindDirections = () => {
  const reportWindDirectionElements = document.querySelectorAll(".report-wind-direction");
  reportWindDirectionElements.forEach((element) => {
    const windDirectionInDegrees = element.dataset.windDirection;
    const direction = windDirections.find((dir) => dir.degrees == windDirectionInDegrees);
    if (direction) {
      element.textContent = direction.direction;
    } else {
      // find the closest direction
      const closestDirection = windDirections.reduce((prev, curr) => {
        return Math.abs(curr.degrees - windDirectionInDegrees) < Math.abs(prev.degrees - windDirectionInDegrees)
          ? curr
          : prev;
      });
      element.textContent = closestDirection.direction;
    }
  });
};

/**
 * The data was outputted so re-fetch it from the DOM.
 * This function loads the temperature chart using data from the reports table.
 * It gathers temperature data from the reports, formats it, and renders a line chart.
 * @returns 
 */
const loadTemperatureChart = () => {
  const container = document.querySelector("#station-chart");
  if (!container) return; // no chart container

  const reports = document.querySelectorAll(".report");
  if (!reports.length) return; // no data rows yet

  // Gather & clean data
  const points = [];
  reports.forEach((report) => {
    const createdAtText = report.querySelector(".created-at")?.textContent?.trim() || "";
    const tempText = report.querySelector(".temp")?.textContent?.trim() || "";

    // Parse date as DD-MM-YYYY
    const d = new Date(createdAtText);
    if (isNaN(d)) return; // skip bad dates
    const label = d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    // Strip any non-number chars
    const num = Number(tempText.replace(/[^\d.+-]/g, ""));

    points.push({ label, value: num });
  });

  if (!points.length) return;

  const chartData = {
    labels: points.map((p) => p.label),
    datasets: [
      {
        name: "Temperature (°C)",
        values: points.map((p) => p.value),
      },
    ],
  };

  // Render
  new frappe.Chart("#station-chart", {
    title: "Temperature",
    data: chartData,
    type: "line",
    height: 250,
    colors: ["#ff6384"],
    axisOptions: { xIsSeries: true }, // treat x as a series
    lineOptions: { hideDots: 0, regionFill: 1 },
    formatTooltipX: (label) => `Date: ${label}`,
    formatTooltipY: (val) => `${val} °C`,
  });
};

