import { Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getAllHolidays, getCountryByAlpha2Code } from "../utils/apiCalls";
import { ICountry } from "../utils/ICountry";
import { IHoliday } from "../utils/IHoliday";

function CountryHolidaysPage() {
    const [checkboxState, setCheckboxState]  = useState<boolean>(false)
    const location = useLocation();
    const alpha2Code = location.pathname.slice(-2);

    const countryQuery = useQuery<ICountry, string>(['country', alpha2Code], () => getCountryByAlpha2Code(alpha2Code))
    console.log('countryQuery', countryQuery.data);

    const allHolidaysQuery = useQuery(['allHolidays', alpha2Code], () => getAllHolidays(alpha2Code));
    console.log('allHolidaysQuery', allHolidaysQuery.data);

    const handleClick = () => setCheckboxState(!checkboxState);

    useEffect(() => {
        const filteredHolidays = allHolidaysQuery.data.holidays.filter((holiday: IHoliday) => holiday.public === checkboxState)
        console.log('filteredHolidays', filteredHolidays)
    }, [checkboxState,  allHolidaysQuery.data])

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
        </div>
    )
}

export default CountryHolidaysPage;