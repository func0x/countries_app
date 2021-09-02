import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Box, IconButton, useColorMode } from "@chakra-ui/react";

function ColorModeChanger(): JSX.Element {
    const { colorMode, toggleColorMode } = useColorMode();
    
    return (
        <Box padding="4" display="flex" alignSelf="flex-start">
            <IconButton
                icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
                isRound={true}
                size='lg'
                alignSelf='flex-end'
                aria-label=''
                onClick={toggleColorMode}
            />
        </Box>
    )
}

export default ColorModeChanger;