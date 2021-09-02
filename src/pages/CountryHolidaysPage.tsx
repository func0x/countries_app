import { Tooltip} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getAllHolidays, getAvailableHolidaysLanguages, getCountryByAlpha2Code } from "../utils/apiCalls";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { checkIsWorkingDay, checkLanguageFallback, formatDate, getDateOneYearPass, getLanguageFromApp, getLanguageFromBrowser } from "../utils/helpers";
import CountryInfo from "../components/CountryInfo";
import Loader from "../components/Loader";
import { IHoliday, ICountry, ILanguage } from "../interfaces";

function CountryHolidaysPage({ langFromForm } : { langFromForm: string }): JSX.Element {
    const [checkboxState, setCheckboxState]  = useState<boolean>(false)
    const [value, setValue] = useState<Date>(getDateOneYearPass());
    const [languages, setLanguages] = useState<ILanguage[]>([])
    const [filteredHolidays, setFilteredHolidays] = useState<IHoliday[]>();
    const location = useLocation();
    const browserLang = getLanguageFromBrowser();
    const alpha2Code = location.pathname.slice(-2);

    const countryQuery = useQuery<ICountry, Error>(['country', alpha2Code], () => getCountryByAlpha2Code(alpha2Code))
    const availableLanguageQuery = useQuery<ILanguage[], Error>('availableLanguage', getAvailableHolidaysLanguages);
    const allHolidaysQuery = useQuery(['allHolidays', alpha2Code, langFromForm], () => getAllHolidays(alpha2Code, checkLanguageFallback(getLanguageFromApp(langFromForm), languages) ));
    
    const handleChange = () => setCheckboxState(!checkboxState);

    function addHolidayToTile(tileDate: Date) {
        if(filteredHolidays && checkboxState) {
            return filteredHolidays.map((holiday: IHoliday) => (holiday.date === formatDate(tileDate) && holiday.name));
        }
        return allHolidaysQuery.data.holidays.map((holiday: IHoliday) => holiday.date === formatDate(tileDate) && (checkIsWorkingDay(holiday) ? <Tooltip label="Working day" aria-label="A tooltip" key={holiday.uuid}>{holiday.name}</Tooltip> : holiday.name))
    }

    function holidayStatus(tileDate: Date) {
        if(filteredHolidays && checkboxState) {
            return filteredHolidays.map((holiday: IHoliday) => (holiday.date === formatDate(tileDate) && 'public'));
        }
        const nonPublicHolidays = allHolidaysQuery.data.holidays.map((holiday: IHoliday) => (holiday.date === formatDate(tileDate) && !holiday.public) ? 'non-public' : '');
        const publicHolidays = allHolidaysQuery.data.holidays.map((holiday: IHoliday) => (holiday.date === formatDate(tileDate) && holiday.public) ? 'public' : '');

        return [...nonPublicHolidays, ...publicHolidays];
    }

    useEffect(() => {
        if(allHolidaysQuery.data) {
            const filteredHolidays = allHolidaysQuery.data.holidays.filter((holiday: IHoliday) => holiday.public === checkboxState)
            setFilteredHolidays(filteredHolidays);
        }
    }, [checkboxState,  allHolidaysQuery.data])

    useEffect(() => {
        if(availableLanguageQuery.data) {
            setLanguages(availableLanguageQuery.data);
        }

    }, [availableLanguageQuery.data])

    return (
        <div>
            {countryQuery.isLoading && <p>'Loading country data...'</p>}
            {countryQuery.error && <p>An error has occurred</p> + countryQuery.error.message}
            {countryQuery.data && (
                <CountryInfo country={countryQuery.data} handleChange={handleChange} checkboxState={checkboxState} />
            )}
            {allHolidaysQuery.isLoading && <Loader />}
            {allHolidaysQuery.data && (
                <div className="custom">
                    <div className="custom__container">
                        <main className="custom__container__content">
                            <Calendar
                                onChange={setValue}
                                value={value}
                                locale={`${browserLang}-${browserLang.toUpperCase()}`}
                                tileContent={({date}) => addHolidayToTile(date)}
                                tileClassName={({date}) => holidayStatus(date)}
                            />
                        </main>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CountryHolidaysPage;