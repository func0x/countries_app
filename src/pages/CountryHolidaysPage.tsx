import { Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getAllHolidays, getCountryByAlpha2Code } from "../utils/apiCalls";
import { ICountry } from "../utils/ICountry";
import { IHoliday } from "../utils/IHoliday";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

function CountryHolidaysPage() {
    const [checkboxState, setCheckboxState]  = useState<boolean>(false)
    const [value, setValue] = useState(new Date());
    const [filteredHolidays, setFilteredHolidays] = useState<IHoliday[]>();
    const location = useLocation();
    const alpha2Code = location.pathname.slice(-2);

    const countryQuery = useQuery<ICountry, string>(['country', alpha2Code], () => getCountryByAlpha2Code(alpha2Code))
    console.log('countryQuery', countryQuery.data);

    const allHolidaysQuery = useQuery(['allHolidays', alpha2Code], () => getAllHolidays(alpha2Code));
    console.log('allHolidaysQuery', allHolidaysQuery.data);

    const handleClick = () => setCheckboxState(!checkboxState);

    function formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = (d.getFullYear() -1);
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    useEffect(() => {
        if(allHolidaysQuery.data) {
            const filteredHolidays = allHolidaysQuery.data.holidays.filter((holiday: IHoliday) => holiday.public === checkboxState)
            setFilteredHolidays(filteredHolidays);
        }
    }, [checkboxState,  allHolidaysQuery.data])

    function addHolidayToTile(tileDate: any) {
        return allHolidaysQuery.data.holidays.map((holiday: IHoliday) => holiday.date === formatDate(tileDate) && holiday.name)
    }

    function holidayStatus(tileDate: any) {
        if(filteredHolidays && checkboxState) {
            return filteredHolidays.map((holiday: IHoliday) => (holiday.date === formatDate(tileDate) && 'public'));
        }
        const nonPublicHolidays = allHolidaysQuery.data.holidays.map((holiday: IHoliday) => (holiday.date === formatDate(tileDate) && !holiday.public) ? 'non-public' : '');
        const publicHolidays = allHolidaysQuery.data.holidays.map((holiday: IHoliday) => (holiday.date === formatDate(tileDate) && holiday.public) ? 'public' : '');

        return [...nonPublicHolidays, ...publicHolidays];
    }

    return (
        <div>
            {countryQuery.data && (
                <>
                    <input type="checkbox" onClick={handleClick} checked={checkboxState} />
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
            {allHolidaysQuery.data && (
                <div className="Sample">
                    <div className="Sample__container">
                        <main className="Sample__container__content">
                        <Calendar
                            onChange={setValue}
                            value={value}
                            locale={`${alpha2Code}-${alpha2Code.toUpperCase()}`}
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