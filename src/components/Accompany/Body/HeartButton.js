import React, { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";

const HeartButton = ({ post, user }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      const db = getFirestore();
      const likesSnapshot = await getDocs(
        collection(db, "posts", post.id, "likes")
      );
      setLikeCount(likesSnapshot.docs.length);

      const userLikeSnapshot = await getDocs(
        query(
          collection(db, "posts", post.id, "likes"),
          where("userId", "==", user.id)
        )
      );
      setLiked(!userLikeSnapshot.empty);
    };

    fetchLikes();
  }, [post, user]);

  const handleLike = async () => {
    const db = getFirestore();
    const likeRef = doc(db, "posts", post?.id, "likes", user?.id);

    if (liked) {
      await deleteDoc(likeRef);
      setLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      await setDoc(likeRef, { userId: user.id });
      setLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  return (
    <div style={{ marginTop: "5px", marginLeft: "8px" }}>
      <button onClick={handleLike}>{liked ? "💖" : "🤍"}</button>
      <span>{likeCount}</span>
    </div>
  );
};

export default HeartButton;
