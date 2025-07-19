export const coordinates = {
  latitude: 37.774929,
  longitude: -122.419418,
};

export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudy.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/clear.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },
};

export const APIkey = "4a6d32ceae3291a032c08a12e1ca6dfd";
