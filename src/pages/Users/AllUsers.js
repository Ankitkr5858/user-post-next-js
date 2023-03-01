import { Box } from "@chakra-ui/react";
import { Flex, Spacer, Center, Square, Text, Input } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return {
    props: { users: data },
  };
};

function AllPost({ users }) {
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  useEffect(() => {
    setSearchUsers(users);
    if (search != "") {
      setSearchUsers((e) => {
        return users.filter((x) =>
          x.name.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
  }, [users, search]);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
          gap: "1rem",
        }}
      >
        <div>
          Search :{" "}
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        {searchUsers.map((x) => {
          return (
            <Box bg="tomato" w="80%" p={4} color="white">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span> Name : {x.name}</span>
                <span> Username : {x.username}</span>
                <span> Email : {x.email}</span>
              </div>
              <Spacer />
              <Flex color="white" w="30%" mt={5} gap={2}>
                <Center w="100px" bg="white">
                  <Link href={"/Users/" + x.id}>
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
    </>
  );
}

export default AllPost;
