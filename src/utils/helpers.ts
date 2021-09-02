import { IHoliday, ILanguage } from "../interfaces";

export function formatDate(date: Date): string {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(); // Because we operate on 2020 holidays

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export function getDateOneYearPass(): Date {
    return new Date(new Date().setFullYear(new Date().getFullYear() - 1))
}

export function getLanguageFromBrowser(): string {
    return navigator.language.slice(0,2);
}

export function getLanguageFromApp(langFromForm: string): string {
    return langFromForm ? langFromForm : (window.localStorage.getItem('calendar-language') || getLanguageFromBrowser());
}

// I think of this when selected lang from our form or our browser isn't available in API then we provide fallback to english
export function checkLanguageFallback(lang: string, data: ILanguage[]): string {
    const checkAvailability = data && data.filter((language: ILanguage) => language.code === lang);
    const langAfterCheckFallback = checkAvailability.length > 0 ? checkAvailability[0].code : 'en';
    return langAfterCheckFallback;
}

export function checkIsWorkingDay(holiday: IHoliday): boolean {
    return !holiday.public && 
        (!holiday.public && holiday.weekday.date.numeric !== '6') && 
        (!holiday.public && holiday.weekday.date.numeric !== '7');
}