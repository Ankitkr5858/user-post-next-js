import {
  Flex,
  Spacer,
  Center,
  Square,
  Text,
  Button,
  Input,
} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";

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
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    setTitle(post.title);
    setBody(post.body);
  }, [post]);

  const EditPost = () => {
    axios
      .put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        title: title,
        body: body,
      })
      .then((res) => {
        console.log(res);
        Router.push(`/Posts/AllPost`);
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
        <b>Title</b> :{" "}
        <Input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Text>
      <div>
        <Text fontSize="xl">
          <b>Description</b> :
        </Text>
        <Input
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Button bg="blue.500" color="white" onClick={EditPost}>
          Save
        </Button>
        <Button
          bg="red"
          color="white"
          onClick={() => {
            Router.push(`/Posts/AllPost`);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default Details;
