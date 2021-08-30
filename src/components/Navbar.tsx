import { useDisclosure, Box, useColorModeValue, Flex, IconButton, HStack, Link as ChakraLink } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link } from "react-router-dom";

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
              <IconButton
                size={'md'}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
              />
              <HStack spacing={8} alignItems={'center'}>
                <Box>Logo</Box>
                <HStack
                  as={'nav'}
                  spacing={4}
                  display={{ base: 'none', md: 'flex' }}>
                  {/* {Links.map((link) => (
                    <NavLink key={link}>{link}</NavLink>
                  ))} */}
                  <ChakraLink
                    px={2}
                    py={1}
                    rounded={'md'}
                    _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('gray.200', 'gray.700'),
                    }}
                    href={'#'}>
                        <Link to="/">Home</Link>
                    </ChakraLink>
                    <ChakraLink
                    px={2}
                    py={1}
                    rounded={'md'}
                    _hover={{
                        textDecoration: 'none',
                        bg: useColorModeValue('gray.200', 'gray.700'),
                    }}
                    href={'#'}>
                        <Link to="/holidays">country</Link>
                    </ChakraLink>
                </HStack>
              </HStack>
            </Flex>
          </Box>
    )
}

export default Navbar;