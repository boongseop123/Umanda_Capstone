import React, { useState } from "react";

import { useMediaQuery } from "react-responsive";

import styles from "./PostPage.module.scss";
import Header from "../Header/Header";
import PostBody from "./Body/PostBody";
import { add } from "date-fns";

const PostPage = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div>
      <div className={styles.Frame1}>
        <Header />
      </div>
      <div
        className={`${isDesktop ? styles.desktopFrame2 : styles.mobileFrame2}`}
      >
        <PostBody />
      </div>
    </div>
  );
};

export default PostPage;
