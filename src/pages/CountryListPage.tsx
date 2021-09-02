import { Badge, Box, Container, Flex, Image, Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { getAllCountries, getCountryByName } from "../utils/apiCalls";
import _ from "lodash";
import { useQuery } from "react-query";
import { getLanguageFromApp } from "../utils/helpers";
import Loader from "../components/Loader";
import { ICountry } from "../interfaces";

function CountryListPage({
  langFromForm,
}: {
  langFromForm: string;
}): JSX.Element {
  const [state, setState] = useState<string>("");
  const [countries, setCountries] = useState<ICountry[] | undefined>([]);

  const allCountriesQuery = useQuery<ICountry[], Error>(
    "allCountries",
    getAllCountries
  );
  const filterCountriesQuery = useQuery<ICountry[], Error>(
    ["filterCountries", state],
    () => getCountryByName(state)
  );

  function handleChange(e: any) {
    e.preventDefault();

    setState(e.target.value);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedChangeHandler = useCallback(_.debounce(handleChange, 300), [
    state,
  ]);

  useEffect(() => {
    return () => debouncedChangeHandler.cancel();
  }, [debouncedChangeHandler]);

  useEffect(() => {
    const data = filterCountriesQuery.data
      ? filterCountriesQuery.data
      : allCountriesQuery.data;
    setCountries(data);
  }, [allCountriesQuery.data, filterCountriesQuery.data, state]);

  return (
    <Container maxW="container.xl">
      <Input
        type="text"
        name="countryName"
        placeholder="Type country here..."
        onChange={debouncedChangeHandler}
      />

      {filterCountriesQuery.isLoading && <Loader />}
      {filterCountriesQuery.error &&
        <p>An error has occurred</p> + filterCountriesQuery.error.message}
      <Flex wrap="wrap" justifyContent="center">
        {countries !== [] &&
          countries &&
          countries.map((country: any, index: number) => (
            <Link
              to={`holidays/${country.alpha2Code.toLowerCase()}`}
              key={index}
            >
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                width="252px"
                margin="12px"
              >
                <Image
                  src={country.flag}
                  alt={`${country.name} flag`}
                  height="150px"
                  width="250px"
                  objectFit="cover"
                  fallbackSrc="https://via.placeholder.com/150"
                />

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
                    style={{ width: "100%", wordBreak: "break-all" }}
                  >
                    {getLanguageFromApp(langFromForm) === "en"
                      ? country.name
                      : (country.translations[getLanguageFromApp(langFromForm)] ? country.translations[getLanguageFromApp(langFromForm)] : country.name)}
                      {/* Fallback for translation name from countries API */}
                  </Box>
                </Box>
              </Box>
            </Link>
          ))}
      </Flex>
    </Container>
  );
}

export default CountryListPage;
