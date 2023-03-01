import "@/styles/globals.css";

import { ChakraProvider, theme, CSSReset } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Flex, Spacer, Center, Square, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box bg="black" w="100%" p={4} color="white">
        <Flex color="white" gap={2}>
          <Center w="100px" bg="white">
            <Link href={"/Posts/AllPost"}>
              <Text fontSize="sm" color="black">
                Posts
              </Text>
            </Link>
          </Center>

          <Center w="100px" bg="white">
            <Link href={"/Users/AllUsers"}>
              <Text fontSize="sm" color="black">
                Users
              </Text>
            </Link>
          </Center>
        </Flex>
      </Box>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
