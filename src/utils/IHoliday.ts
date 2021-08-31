interface IDate {
    name: string,
    numeric: string,
}

interface IObserved {
    name: string,
    numeric: string,
}


interface IWeekday {
    data: IDate,
    observed: IObserved,
}

export interface IHoliday {
    country: string,
    date: string,
    name: string,
    observed: string,
    public: boolean,
    uuid: string,
    weekday: IWeekday,
}