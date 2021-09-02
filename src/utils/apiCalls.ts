import axios from 'axios';

// I know this is not good solution but for purpose test this task i leave here
// Good solution is provide this key as a argument in terminal when we start the app
const API_KEY='33f6daa6-c69d-4e8a-8323-8a1f141d0110';

export const getAllCountries = async () => {
    return axios.get(`${process.env.REACT_APP_ALL_COUNTRIES_URL}`).then((response) => response.data).catch(error => console.error(error));
}

export const getCountryByName = async (country: string) => {
    if (country !== '') {
        return axios.get(`${process.env.REACT_APP_COUTRY_BY_NAME_URL}${country}`).then((response) => response.data).catch(error => console.error(error));
    }
}

export const getCountryByAlpha2Code = async (alpha2Code: string) => {
    return axios.get(`${process.env.REACT_APP_COUNTRY_BY_ALPHA2CODE_URL}${alpha2Code}`).then((response) => response.data).catch(error => console.error(error));
}

export const getAllHolidays = async (alpha2Code: string, lang: string) => {
    return axios.get(`${process.env.REACT_APP_ALL_HOLIDAYS_URL}?key=${API_KEY}&country=${alpha2Code.toUpperCase()}&language=${lang}&year=2020`)
    .then((response) => response.data).catch(error => console.error(error))
}

export const getAvailableHolidaysLanguages = async () => {
    return axios.get(`${process.env.REACT_APP_AVAILABLE_HOLIDAYS_LANGUAGES_URL}?key=${API_KEY}`)
    .then((response) => response.data.languages).catch(error => console.error(error))
}

