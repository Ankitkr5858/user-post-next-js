import { Flex, Spacer, Center, Square, Text } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import Link from "next/link";

export const getStaticPaths = async (context) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  const paths = data.map((x) => {
    return {
      params: { id: x.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${context.params.id}`
  );
  const data = await res.json();
  const res2 = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data2 = await res2.json();

  const relatedPosts = data2.filter((x) => {
    if (x.userId == context.params.id) {
      return x;
    }
  });
  return {
    props: { user: data, relatedPosts },
  };
};

function Details({ user, relatedPosts }) {
  return (
    <div
      style={{
        boxShadow: "black 3px 6px 39px -15px",
        width: "80%",
        margin: "1rem auto",
        minHeight: "100px",
        padding: "1rem ",
      }}
    >
      <Text fontSize="xl">
        <b>Name</b> : {user.name}
      </Text>
      <Text fontSize="xl">
        <b>Username</b> : {user.username}
      </Text>
      <Text fontSize="xl">
        <b>Address</b> : {user.address.street},{user.address.suite},
        {user.address.city}
      </Text>
      <br />
      <hr />
      <br />
      <Text fontSize="4xl" fontWeight="bold">
        Related Post
      </Text>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
          gap: "1rem",
        }}
      >
        {relatedPosts.map((x) => {
          return (
            <Box bg="tomato" w="80%" p={4} color="white">
              {x.title}
              <Spacer />
              <Flex color="white" w="30%" mt={5} gap={2}>
                <Center w="100px" bg="white">
                  <Link href={"/Posts/" + x.id}>
                    <Text fontSize="sm" color="black">
                      View
                    </Text>
                  </Link>
                </Center>
              </Flex>
            </Box>
          );
        })}
      </div>
    </div>
  );
}

export default Details;
