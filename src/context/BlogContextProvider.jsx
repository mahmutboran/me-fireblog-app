import { onValue, push, ref, remove, set, update } from "firebase/database";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firebaseDB } from "../utils/firebaseUtil";
import { AuthContext } from "./AuthContextProvider";

export const BlogContext = createContext();

export const useBlog = () => {
  return useContext(BlogContext);
};

export const BlogContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [currentBlogs, setCurrentBlogs] = useState();

  const addBlog = (blogValue) => {
    const blogRef = ref(firebaseDB, "blogs");
    const newBlogRef = push(blogRef);
    set(newBlogRef, {
      title: blogValue.title,
      imgUrl: blogValue.imgUrl,
      content: blogValue.content,
      user: currentUser?.email,
      addDate: Date.now(),
      likeCount: {[currentUser?.uid]:0},
      commentCount: 0,
      comments: "",
      open: true,
    });
  };
  const getOneBlog = (id) => {
    const result = currentBlogs?.filter((item) => item?.id === id);
    return result;
  };
  const deleteBlog = (id) => {
    remove(ref(firebaseDB, "blogs/" + id));
  };

  const editBlog = (post) => {
    const updates = {};
    updates["blogs/" + post?.id] = post;
    return update(ref(firebaseDB), updates);
  };

  const useData = () => {
    useEffect(() => {
      const blogRef = ref(firebaseDB, "blogs");
      onValue(blogRef, (snapshot) => {
        const data = snapshot.val();

        const blogList = [];
        for (const id in data) {
          blogList.push({ id, ...data[id] });
        }
        setCurrentBlogs(blogList);
      });
    }, []);
    return { currentBlogs };
  };

  return (
    <BlogContext.Provider
      value={{ addBlog, useData, editBlog, deleteBlog, getOneBlog }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export default BlogContextProvider;
