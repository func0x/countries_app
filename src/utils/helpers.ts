import { IHoliday } from "./IHoliday";

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

export function checkIsWorkingDay(holiday: IHoliday): boolean {
    return !holiday.public && 
        (!holiday.public && holiday.weekday.date.numeric !== '6') && 
        (!holiday.public && holiday.weekday.date.numeric !== '7');
}