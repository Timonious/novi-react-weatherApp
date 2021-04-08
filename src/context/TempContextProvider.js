import React, {createContext, useState} from 'react';
import kelvinToCelsius from "../helpers/kelvinToCelcius";
import kelvinToFahrenheit from "../helpers/kelvinToFarenheit";

export const TempContext = createContext(null);

const TempContextProvider = ({children}) => {
    const [temperatureUnit, toggleTemperatureUnit] = useState('celsius'),
        toggleTemp = () => {
            if (temperatureUnit === 'celsius') {
                toggleTemperatureUnit('farenheit');
            } else {
                toggleTemperatureUnit('celsius')
            }
        }

    return (
        <TempContext.Provider value={{
            toggleTemp: toggleTemp,
            kelvinToUnit: temperatureUnit === 'celsius' ? kelvinToCelsius : kelvinToFahrenheit,
        }}>
            {children}
        </TempContext.Provider>
    )
}

export default TempContextProvider
