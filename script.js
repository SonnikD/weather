document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".card-form");
  const inputFields = document.querySelectorAll(".input-field");
  const cityInput = document.querySelector('input[name="city"]');
  const countryInput = document.querySelector('input[name="country"]');
  const apiKey = "e175feb838ec4826918111919242404";
  const weatherAPIUrl = "http://api.weatherapi.com/v1/current.json";

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const city = cityInput.value.trim();
    const country = countryInput.value.trim();

    const query = `${city},${country}`;
    const url = `${weatherAPIUrl}?key=${apiKey}&q=${query}`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка запроса погоды");
        }
        return response.json();
      })
      .then((data) => {
        displayWeather(data);
      })
      .catch((error) => {
        alert("Произошла ошибка: " + error.message);
      });
  });

  function displayWeather(data) {
    const cardContainer = document.querySelector(".card2");
    const weatherContainer = document.querySelector(".weather-container");
    const { temp_c, humidity, wind_kph } = data.current;
    const localtime = data.location.localtime.split(" ")[1];
    const weatherHTML = `
      <h2>Погода в ${data.location.name}, ${data.location.country}</h2>
      <p>Температура: ${temp_c}°C</p>
      <p>Влажность: ${humidity}%</p>
      <p>Скорость ветра: ${wind_kph} км/ч</p>
      <p>Местное время: ${localtime}</p>
    `;

    weatherContainer.innerHTML = weatherHTML;
    cardContainer.style.display = "block";
  }
});
