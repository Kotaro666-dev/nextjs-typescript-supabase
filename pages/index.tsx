import React, { useEffect } from "react";
import { supabase } from "../components/helper/SupabaseClient";
import { authActions } from "../store/auth-slice";
import { userActions } from "../store/user-slice";
import { useAuthDispatch, useUserDispatch } from "../store/store";
import PostItem from "../components/posts/postItem";
import { convertTimestamptz } from "../components/helper/TimestamptzConvertor";

export type Post = {
  id: string;
  userName: string;
  title: string;
  body: string;
  posted_at: string;
};

const HomePage: React.FC<{ posts: Post[] }> = ({ posts }) => {
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();
  // const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getUserData = async (uid: string) => {
      const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("uid", uid);
      if (users) {
        const { username, email } = users[0];
        userDispatch(
          userActions.updateUser({
            username: username,
            email: email,
          })
        );
      }
    };
    const session = supabase.auth.session();
    if (session) {
      const uid = session.user?.id as string;
      authDispatch(authActions.signIn(uid));
      getUserData(uid);
    }
  }, [userDispatch, authDispatch]);

  // useEffect(() => {
  //   const getUserData = async (uid: string) => {
  //     const { data: users, error } = await supabase
  //       .from("users")
  //       .select("*")
  //       .eq("uid", uid);
  //     if (users) {
  //       const { username, email } = users[0];
  //       userDispatch(
  //         userActions.updateUser({
  //           username: username,
  //           email: email,
  //         })
  //       );
  //     }
  //   };

  //   const getPosts = async () => {
  //     const { data: posts, error } = await supabase.from("posts").select("*");
  //     if (error) {
  //       console.log(error);
  //       return;
  //     }
  //     if (posts?.length === 0) {
  //       return;
  //     }
  //     const newPosts: Array<Post> = [];
  //     posts?.forEach((post) => {
  //       const newPost: Post = {
  //         id: post.id,
  //         userName: post.uid,
  //         title: post.title,
  //         body: post.body,
  //         posted_at: convertTimestamptz(post.created_at as string),
  //       };
  //       newPosts.push(newPost);
  //     });
  //     const updatedOrderPosts = newPosts.reverse();
  //     setPosts(updatedOrderPosts);
  //   };

  //   const session = supabase.auth.session();
  //   if (session) {
  //     const uid = session.user?.id as string;
  //     authDispatch(authActions.signIn(uid));
  //     getUserData(uid);
  //   }
  //   getPosts();
  // }, [authDispatch, userDispatch]);

  return (
    <main>
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
    </main>
  );
};

export const getStaticProps = async () => {
  const getPosts = async () => {
    const { data: posts, error } = await supabase.from("posts").select("*");
    if (error) {
      console.log(error);
      return [];
    }
    if (posts?.length === 0) {
      return [];
    }
    const newPosts: Array<Post> = [];
    posts?.forEach((post) => {
      const newPost: Post = {
        id: post.id,
        userName: post.username,
        title: post.title,
        body: post.body,
        posted_at: convertTimestamptz(post.created_at as string),
      };
      newPosts.push(newPost);
    });
    const updatedOrderPosts = newPosts.reverse();
    return updatedOrderPosts;
  };

  const posts = await getPosts();
  return {
    props: {
      posts: posts,
    },
    revalidate: 1,
  };
};

export default HomePage;
