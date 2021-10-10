import React, { useEffect, useState } from "react";
import { supabase } from "../components/helper/SupabaseClient";
import { authActions } from "../store/auth-slice";
import { useAuthDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";
import PostItem from "../components/posts/postItem";

export type Post = {
  id: string;
  userName: string;
  title: string;
  body: string;
  posted_at: string;
};

const HomePage = () => {
  const authDispatch = useAuthDispatch();
  const { isLoggedIn, idToken } = useSelector((state: RootState) => state.auth);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getUserData = async (uid: string) => {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("uid", uid);
      if (data) {
        console.log(data);
      }
    };

    const getPosts = async () => {
      const { data: posts, error } = await supabase.from("posts").select("*");
      if (error) {
        console.log(error);
        return;
      }
      if (posts?.length === 0) {
        return;
      }
      const newPosts: Array<Post> = [];
      posts?.forEach((post) => {
        const newPost: Post = {
          id: post.id,
          userName: post.uid,
          title: post.title,
          body: post.body,
          posted_at: post.created_at as string,
        };
        newPosts.push(newPost);
      });
      setPosts(newPosts);
    };

    const session = supabase.auth.session();
    if (session) {
      const uid = session.user?.id as string;
      authDispatch(authActions.signIn(uid));
      getUserData(uid);
    }
    getPosts();
  }, [authDispatch]);

  return (
    <div>
      {posts.length === 0 && <h1>No posts</h1>}
      {posts.map((post) => {
        return (
          <PostItem
            key={post.id}
            title={post.title}
            userName={post.userName}
            body={post.body}
            posted_at={post.posted_at}
          />
        );
      })}
    </div>
  );
};

export default HomePage;
