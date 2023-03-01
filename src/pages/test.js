import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Box } from "@chakra-ui/react";
import { Flex, Spacer, Center, Square, Text } from "@chakra-ui/react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
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
            <Text fontSize="sm" color="black">
              Users
            </Text>
          </Center>
        </Flex>
      </Box>
    </>
  );
}
