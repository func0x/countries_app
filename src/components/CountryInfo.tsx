import { Container, Box, Checkbox, Text, Image } from "@chakra-ui/react"
import { ICountry } from "../interfaces";

type HandleChangeFunction = () => void;

function CountryInfo({country, handleChange, checkboxState}: {country: ICountry, handleChange: HandleChangeFunction , checkboxState: boolean}): JSX.Element {
    return (
        <Container>
            <Box padding="4" bg="gray.100" borderRadius="8" d="flex" flexDirection="column" alignItems="center">
                <Text fontSize="4xl" marginBottom="4">{country.name}</Text>
                <Image src={country.flag} alt={`${country.name} flag`} height="150px" width="250px" objectFit="cover" fallbackSrc="https://via.placeholder.com/150"/>
                <Checkbox colorScheme="blue" onChange={handleChange} checked={checkboxState} marginTop="4">Only public holiday</Checkbox>
            </Box>
        </Container>
    )
}

export default CountryInfo