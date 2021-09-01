import { IHoliday } from "./IHoliday";

export function formatDate(date: Date): string {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + (d.getDate() + 1),
        year = (d.getFullYear() - 1); // Because we operate on 2020 holidays

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export function getLanguageFromBrowser(): string {
    return navigator.language.slice(0,2);
}

export function checkIsWorkingDay(holiday: IHoliday): boolean {
    return !holiday.public && 
        (!holiday.public && holiday.weekday.date.numeric !== '6') && 
        (!holiday.public && holiday.weekday.date.numeric !== '7');
}