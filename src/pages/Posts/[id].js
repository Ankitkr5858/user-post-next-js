import { Flex, Spacer, Center, Square, Text, Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";

export const getStaticPaths = async (context) => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
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
    `https://jsonplaceholder.typicode.com/posts/${context.params.id}`
  );
  const data = await res.json();

  return {
    props: { post: data },
  };
};

function Details({ post }) {
  const DeletePost = () => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${post.id}`)
      .then((res) => {
        console.log(res);
      });
  };
  return (
    <div
      style={{
        boxShadow: "black 3px 6px 39px -15px",
        width: "80%",
        margin: "1rem auto",
        minHeight: "100px",
        padding: "1rem ",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Text fontSize="xl">
        <b>Title</b> : {post.title}
      </Text>
      <div>
        <Text fontSize="xl">
          <b>Description</b> :
        </Text>
        <Text fontSize="xl">{post.body}</Text>
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Button
          bg="blue.500"
          color="white"
          onClick={() => {
            Router.push(`/Posts/Edit/${post.id}`);
          }}
        >
          Edit
        </Button>
        <Button bg="red" color="white" onClick={DeletePost}>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Details;
