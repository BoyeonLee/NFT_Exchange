import React from "react";
import { Stack, Flex, Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <Stack h="100vh">
      <Flex
        bg="purple.100"
        p={4}
        pr="30vh"
        pl="30vh"
        justifyContent="space-around"
        alignItems="center"
        h="10vh"
      >
        <Box
          onClick={() => {
            window.location.reload();
          }}
          cursor="pointer"
        >
          <Text fontWeight="bold" fontSize="3xl">
            NFT-Exchange
          </Text>
        </Box>
        <Link to="/">
          <Button size="md" colorScheme="red">
            <Text fontSize="xl">Mint NFT</Text>
          </Button>
        </Link>
        <Link to="/my-nft">
          <Button size="md" colorScheme="teal">
            <Text fontSize="xl">My NFT</Text>
          </Button>
        </Link>
        <Link to="/sale-nft">
          <Button size="md" colorScheme="green">
            <Text fontSize="xl">Sale NFT</Text>
          </Button>
        </Link>
      </Flex>
      <Flex direction="column" h="full" justifyContent="center" alignItems="center">
        {children}
      </Flex>
    </Stack>
  );
}

export default Layout;
