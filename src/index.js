import './main.css';
import regeneratorRuntime from "regenerator-runtime";

import {
    switchScreenDisplay,
    createLoadingSpinner,
} from './scripts/helpers';

import {
    processWeatherData
} from './scripts/processData'


const searchInput = document.querySelector('.search-cont__input');
const locationInputBtn = document.querySelector('.search-cont__btn');

const searchInputFields = document.querySelectorAll('.search-input');
const searchIcon = document.querySelectorAll('.input-icon');

const mainWeatherInfoCont = document.querySelector('.weath--cont');
const forecastCont = document.querySelector('.forecast-cont');

const startInput = document.querySelector('#start-input-weather-loc');
const secondInput = document.querySelector('#search-location-weather');


function processWeatherDataAfterEnter(e, input) {
    let targetVal = input.value;

    if ( (targetVal === '' && e.key === 'Enter') && input.id === 'start-input-weather-loc' ) {
        targetVal = 'Helsinki';
        processWeatherData(targetVal);
        switchScreenDisplay();
    }
    if ( targetVal !== '' ) {
        if ( e.key === 'Enter' ) {
            // If input field is in the start screen, switch screen display
            if ( input.id === 'start-input-weather-loc' ) {
                switchScreenDisplay();
                // input field in the main weather info page or in the error container
            } else if ( input.id === 'search-location-weather' || input.id === 'error__search-location') {
                mainWeatherInfoCont.innerHTML = createLoadingSpinner();
                forecastCont.innerHTML = ' ';
                input.value = '';
            }
            processWeatherData(targetVal);
        }
    }
}

// When user clicks little icon on the input fields get weather data from input value
function processDataAfterIconClick(e) {
    let targetValue;
    // Start screen input
    if ( e.target.id === 'start-icon' ) {
        targetValue = startInput.value;
        if ( targetValue === '' ) {
            // if input field is empty, search weather from Helsinki
            targetValue = 'Helsinki';
        }
        processWeatherData(targetValue);
        switchScreenDisplay();

        // main weather info page input field
    } else if ( e.target.id === 'second-icon' ) {
        targetValue = secondInput.value;
        if ( targetValue !== '' ) {
            processWeatherData(targetValue);
            mainWeatherInfoCont.innerHTML = createLoadingSpinner();
            secondInput.value = '';
            forecastCont.innerHTML = ' ';
        }
    }
}

function processDataAfterError(e, input) {
    // When user clicks icon process weather data from input field
    if ( e.target.id === 'error-icon' ) {
        if ( input.value !== '' ) {
            mainWeatherInfoCont.innerHTML = createLoadingSpinner();
            processWeatherData(input.value);
            input.value = '';
        }
    }
    // Listens enter when error input field is clicked
    if ( e.target.id === 'error__search-location' ) {
        input.addEventListener('keydown', (ev) => {
            processWeatherDataAfterEnter(ev, input);
        })
    }
}


function processDataAfterButtonClick(input) {
    let target = input.value;
    if ( target === '' ) {
        target = 'Helsinki';
    }
    processWeatherData(target);
    switchScreenDisplay();
}


function eventListeners() {
    // When user tries search weather after error msg, process that data.
    mainWeatherInfoCont.addEventListener('click', (e) => {
        let targetInput = document.querySelector('.error__input');
        processDataAfterError(e, targetInput);
    })

    searchIcon.forEach((icon) => {
        icon.addEventListener('click', (e) => {
            processDataAfterIconClick(e);
        })
    })

    searchInputFields.forEach((input) => {
        input.addEventListener('keydown', (e) => {
            processWeatherDataAfterEnter(e, input);
        })
    })

    locationInputBtn.addEventListener('click', () => {
        processDataAfterButtonClick(searchInput);
    })
}

eventListeners();


