import { windDirections } from "../constants/weather-constants.js";

// Track current chart type and view
let currentChartType = "temperature";
let currentChartView = "line";

/**
 * Initialize the reports features.
 */
document.addEventListener("DOMContentLoaded", function () {
  console.log("Weather constants loaded");
  showReportsWindDirections();
  loadWindDirectionDropDown();
  renderCurrentChart();
  listenForWhichChartToLoad();
  listenForChartViewToLoad();
});

/**
 * Load the wind direction dropdown.
 */
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

/**
 * Show the wind directions in the reports.
 */
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
 * Render the chart based on current type and view.
 */
function renderCurrentChart() {
  // Clear chart container
  const container = document.querySelector("#station-chart");
  if (container) container.innerHTML = "";
  // Map view to frappe chart type
  let chartType = "line";
  let areaMode = false;
  if (currentChartView === "bar") chartType = "bar";
  // Call generic loader with config
  if (currentChartType === "temperature") {
    loadGenericChart({
      chartType,
      areaMode,
      title: "Temperature",
      datasetName: "Temperature (°C)",
      color: "#ff6384",
      valueSelector: ".temp",
      valueFormatter: (val) => `${val} °C`
    });
  } else if (currentChartType === "wind") {
    loadGenericChart({
      chartType,
      areaMode,
      title: "Wind Direction",
      datasetName: "Wind Direction (°)",
      color: "#36a2eb",
      valueSelector: ".wind-direction",
      valueFormatter: (val) => `${val}°`
    });
  } else if (currentChartType === "pressure") {
    loadGenericChart({
      chartType,
      areaMode,
      title: "Pressure",
      datasetName: "Pressure (hPa)",
      color: "#ffce56",
      valueSelector: ".pressure",
      valueFormatter: (val) => `${val} hPa`
    });
  }
}

/**
 * Generic chart loader for reports.
 * @param {Object} config
 * @param {string} config.chartType - "line" or "bar"
 * @param {string} config.title - Chart title
 * @param {string} config.datasetName - Name for dataset
 * @param {string} config.color - Chart color
 * @param {string} config.valueSelector - Selector for value cell in report row
 * @param {function} config.valueFormatter - Function to format tooltip Y value
 */
function loadGenericChart({
  chartType = "line",
  title = "",
  datasetName = "",
  color = "#000",
  valueSelector = "",
  valueFormatter = (val) => val
}) {
  const container = document.querySelector("#station-chart");
  if (!container) return;

  const reports = document.querySelectorAll(".report");
  if (!reports.length) return;

  // Gather & clean data
  const points = [];
  reports.forEach((report) => {
    const createdAtText = report.querySelector(".created-at")?.textContent?.trim() || "";
    const valueText = report.querySelector(valueSelector)?.textContent?.trim() || "";

    // Parse date as DD-MM-YYYY
    const d = new Date(createdAtText);
    if (isNaN(d)) return; // skip bad dates
    const label = d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    // Strip any non-number chars
    const num = Number(valueText.replace(/[^\d.+-]/g, ""));

    points.push({ label, value: num });
  });

  if (!points.length) return;

  const chartData = {
    labels: points.map((p) => p.label),
    datasets: [
      {
        name: datasetName,
        values: points.map((p) => p.value),
      },
    ],
  };

  // Render
  new frappe.Chart("#station-chart", {
    title,
    data: chartData,
    type: chartType,
    height: 250,
    colors: [color],
    axisOptions: { xIsSeries: true },
    lineOptions: { hideDots: 0, regionFill: 1 },
    formatTooltipX: (label) => `Date: ${label}`,
    formatTooltipY: valueFormatter,
  });
}

/**
 * Listen for switching between chart types and update button group active status.
 */
const listenForWhichChartToLoad = () => {
  const group = document.getElementById("chart-type-group");
  if (!group) return;
  group.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-chart]");
    if (!btn) return;
    // Update button active status
    group.querySelectorAll("button").forEach(b => b.classList.remove("is-link", "is-selected"));
    btn.classList.add("is-link", "is-selected");
    // Set and render
    currentChartType = btn.dataset.chart;
    renderCurrentChart();
  });
};

/**
 * Listen for switching between chart views and update button group active status.
 */
const listenForChartViewToLoad = () => {
  const group = document.getElementById("chart-view-group");
  if (!group) return;
  group.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-view]");
    if (!btn) return;
    // Update button active status
    group.querySelectorAll("button").forEach(b => b.classList.remove("is-link", "is-selected"));
    btn.classList.add("is-link", "is-selected");
    // Set and render
    currentChartView = btn.dataset.view;
    renderCurrentChart();
  });
};

