const API_BASE = "https://weather-proxy.freecodecamp.rocks/api/city";

/**
 * getWeather - fetches weather data for a given city
 * @param {string} city
 * @returns {object|undefined} JSON data or undefined on error
 */
async function getWeather(city) {
  try {
    const response = await fetch(`${API_BASE}/${city}`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// ===========================
// HELPERS
// ===========================
const val = (v, unit = "") =>
  v !== undefined && v !== null ? `${v}${unit}` : "N/A";

// ===========================
// showWeather
// ===========================
async function showWeather(city) {
  const data = await getWeather(city);

  if (!data) {
    alert("Something went wrong, please try again later");
    return;
  }

  const card = document.getElementById("weather-card");

  // Location
  document.getElementById("location").textContent = val(data.name);

  // Weather type
  const weatherMain = data.weather?.[0]?.main;
  const weatherDesc = data.weather?.[0]?.description;
  document.getElementById("weather-main").textContent =
    weatherMain !== undefined ? `${weatherMain} — ${weatherDesc ?? ""}` : "N/A";

  // Icon
  const icon = document.getElementById("weather-icon");
  const iconUrl = data.weather?.[0]?.icon;
  if (iconUrl) {
    icon.src = iconUrl;
    icon.alt = weatherDesc ?? "weather icon";
    icon.classList.add("loaded");
  } else {
    icon.src = "";
    icon.classList.remove("loaded");
  }

  // Temperatures
  document.getElementById("main-temperature").textContent = val(
    data.main?.temp,
    " °C",
  );
  document.getElementById("feels-like").textContent = val(
    data.main?.feels_like,
    " °C",
  );

  // Humidity
  document.getElementById("humidity").textContent = val(
    data.main?.humidity,
    " %",
  );

  // Wind
  document.getElementById("wind").textContent = val(data.wind?.speed, " m/s");
  document.getElementById("wind-gust").textContent = val(
    data.wind?.gust,
    " m/s",
  );

  // Reveal card with animation
  card.classList.add("visible");
}

// ===========================
// EVENT LISTENER
// ===========================
document.getElementById("get-weather-btn").addEventListener("click", () => {
  const city = document.getElementById("city-select").value;
  if (!city) return;
  showWeather(city);
});
