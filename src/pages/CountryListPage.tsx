import { Badge, Box, Container, Flex, Image, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getAllCountries, getCountryByName } from "../utils/apiCalls";
import _ from 'lodash';
import { useQuery } from "react-query";
import { ICountry } from "../utils/ICountry";


function CountryListPage() {
    const [state, setState] = useState<string>('');
    const [countries, setCountries] = useState<ICountry[] | undefined>([]);

    const allCountriesQuery = useQuery<ICountry[], string>('allCountries', getAllCountries)

    const filterCountriesQuery = useQuery<ICountry[], string>(['filterCountries', state], () => getCountryByName(state))

    function handleChange(e: any) {
        e.preventDefault();

        setState(e.target.value);
    }

    const debouncedChangeHandler = useCallback(_.debounce(handleChange, 300), [state]);

    useEffect(() => {
        return () => debouncedChangeHandler.cancel();
    }, [debouncedChangeHandler]);  

    useEffect(() => {
        const data = filterCountriesQuery.data ? filterCountriesQuery.data : allCountriesQuery.data;
        setCountries(data);
    }, [allCountriesQuery.data, filterCountriesQuery.data, state])

    return (
        <Container maxW="container.xl">
            <Input type="text" name="countryName" placeholder="Type country here..." onChange={debouncedChangeHandler} />

            {filterCountriesQuery.isLoading && <p>'Loading...'</p>}
            {filterCountriesQuery.error && <p>An error has occurred</p> + filterCountriesQuery.error}
            <Flex wrap="wrap" justifyContent="center">
            {(countries !== [] && countries ) && countries.map((country: any, index: number) => (
                <Link to={`holidays/${country.alpha2Code.toLowerCase()}`} key={index}>
                    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" width="252px" margin="12px" >
                        <Image src={country.flag} alt={`${country.name} flag`} height="150px" width="250px" objectFit="cover" fallbackSrc="https://via.placeholder.com/150"/>
            
                        <Box p="6">
                            <Box d="flex" alignItems="baseline">
                                <Badge borderRadius="full" px="2" colorScheme="teal">
                                {country.alpha3Code}
                                </Badge>
                            </Box>
                
                            <Box
                                mt="1"
                                fontWeight="semibold"
                                as="h4"
                                lineHeight="tight"
                                style={{ width: '100%', wordBreak: 'break-all' }}
                            >
                                {country.name}
                            </Box>
                        </Box>
                    </Box>
                </Link>
            ))}
            </Flex>
        </Container>
    )
}

export default CountryListPage;