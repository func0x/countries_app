import { Box, Image } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getCountryByAlpha2Code } from "../utils/apiCalls";
import { ICountry } from "../utils/ICountry";

function CountryHolidaysPage() {
    const location = useLocation();
    const alpha2Code = location.pathname.slice(-2);

    const countryQuery = useQuery<ICountry, string>(['countryCountries', alpha2Code], () => getCountryByAlpha2Code(alpha2Code))
    console.log('countryQuery', countryQuery.data);


    return (
        <div>
            {countryQuery.data && (
                <>
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