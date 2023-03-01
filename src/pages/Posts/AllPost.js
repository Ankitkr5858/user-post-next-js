import { Box } from "@chakra-ui/react";
import { Flex, Spacer, Center, Square, Text, Input } from "@chakra-ui/react";
import {
  Previous,
  Paginator,
  PageGroup,
  Page,
  Next,
  generatePages,
} from "chakra-paginator";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";
import Link from "next/link";
import { useEffect, useState } from "react";

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await res.json();

  return {
    props: { posts: data },
  };
};

function AllPost({ posts }) {
  const [search, setSearch] = useState("");
  const [searchPost, setSearchPost] = useState([]);

  const items = [
    { name: "Apple", quantity: 3 },
    { name: "Banana", quantity: 5 },
    { name: "Carrot", quantity: 4 },
    { name: "Chocolate", quantity: 1 },
    { name: "Marshmallow", quantity: 5 },
    { name: "Cinnamon", quantity: 10 },
    { name: "Lasagna", quantity: 10 },
    { name: "Linguine", quantity: 20 },
  ];
  const itemLimit = 25;
  const [pagesQuantity, setPagesQuantity] = useState(0);
  const [curPage, setCurPage] = useState(1);

  const normalStyles = {
    bg: "white",
  };

  const activeStyles = {
    bg: "blue.300",
  };

  const handlePageChange = (page) => {
    setCurPage(page);
  };

  useEffect(() => {
    const pagesTotal = Math.ceil(posts.length / itemLimit);

    setPagesQuantity(pagesTotal);
  }, [posts]);

  useEffect(() => {
    const offset = (curPage - 1) * itemLimit;

    setSearchPost(posts.slice(offset, offset + itemLimit));
    if (search != "") {
      setSearchPost((e) => {
        return posts.filter((x) =>
          x.title.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
  }, [posts, search, curPage]);

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
        {searchPost.map((x) => {
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
        <Flex p={2}>
          <Spacer />
          {searchPost && (
            <Paginator
              onPageChange={handlePageChange}
              pagesQuantity={pagesQuantity}
            >
              <Previous bg="white">
                <CgChevronLeft />
              </Previous>
              <PageGroup>
                {generatePages(pagesQuantity)?.map((page) => (
                  <Page
                    key={`paginator_page_${page}`}
                    page={page}
                    normalStyles={normalStyles}
                    activeStyles={activeStyles}
                  />
                ))}
              </PageGroup>
              <Next bg="white">
                <CgChevronRight />
              </Next>
            </Paginator>
          )}
        </Flex>
      </div>
    </>
  );
}

export default AllPost;
