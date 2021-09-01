import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

function ErrorFallback({error}: {error: Error}): JSX.Element {
    return (
        <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{error.message}</AlertTitle>
        </Alert>
    )
}

export default ErrorFallback;