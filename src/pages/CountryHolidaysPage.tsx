import { Box, Image, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getAllHolidays, getCountryByAlpha2Code } from "../utils/apiCalls";
import { ICountry } from "../utils/ICountry";
import { IHoliday } from "../utils/IHoliday";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { checkIsWorkingDay, formatDate, getDateOneYearPass, getLanguageFromBrowser } from "../utils/helpers";

function CountryHolidaysPage({ langFromFrom } : { langFromFrom: string }): JSX.Element {
    const [checkboxState, setCheckboxState]  = useState<boolean>(false)
    const [value, setValue] = useState<Date>(getDateOneYearPass());
    const [filteredHolidays, setFilteredHolidays] = useState<IHoliday[]>();
    const location = useLocation();
    const alpha2Code = location.pathname.slice(-2);
    const browserLang = getLanguageFromBrowser();

    const countryQuery = useQuery<ICountry, Error>(['country', alpha2Code], () => getCountryByAlpha2Code(alpha2Code))

    const allHolidaysQuery = useQuery(['allHolidays', alpha2Code, browserLang, langFromFrom], () => getAllHolidays(alpha2Code, langFromFrom ? langFromFrom : (window.localStorage.getItem('calendar-language') || browserLang) ));

    const handleChange = () => setCheckboxState(!checkboxState);

    function addHolidayToTile(tileDate: Date) {
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

    return (
        <div>
            {countryQuery.isLoading && <p>'Loading country data...'</p>}
            {countryQuery.error && <p>An error has occurred</p> + countryQuery.error.message}
            {countryQuery.data && (
                <>
                    <input type="checkbox" onChange={handleChange} checked={checkboxState} />
                    <Image src={countryQuery.data.flag} alt={`${countryQuery.data.name} flag`} height="150px" width="250px" objectFit="cover" fallbackSrc="https://via.placeholder.com/150"/>
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        style={{ width: '100%', wordBreak: 'break-all' }}
                    >
                        {countryQuery.data.name}
                    </Box>
                </>
            )}
            {allHolidaysQuery.isLoading && <p>'Loading calendar...'</p>}
            {allHolidaysQuery.data && (
                <div className="Sample">
                    <div className="Sample__container">
                        <main className="Sample__container__content">
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