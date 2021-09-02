import { Container, Box, Spinner, Text } from "@chakra-ui/react";

function Loader() : JSX.Element {
    return (
        <Container>
            <Box padding="4" d="flex" flexDirection="column" alignItems="center">
                <Text fontSize="4xl" marginBottom="4">Loading...</Text>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
            </Box>
        </Container>
    )
}

export default Loader;