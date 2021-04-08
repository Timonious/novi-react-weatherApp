const kelvinToFahrenheit = (kelvin) =>
    `${Math.round(kelvin * 9/5 - 459.67)}° F`;
// `${Math.round((kelvin - 273.15) * 1.8) + 32}° F`;
export default kelvinToFahrenheit

