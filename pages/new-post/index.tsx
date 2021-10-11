import React, { useState } from "react";
import { isEmpty } from "../../components/helper/ValidateInput";
import { supabase } from "../../components/helper/SupabaseClient";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useRouter } from "next/router";

import classes from "./index.module.css";

const NewPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputBody, setInputBody] = useState("");
  const { idToken } = useSelector((state: RootState) => state.auth);
  const { username } = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const addNewPost = async () => {
    try {
      setIsLoading(true);

      // API reqeust
      const { data, error } = await supabase.from("posts").insert([
        {
          title: inputTitle,
          body: inputBody,
          uid: idToken,
          username: username,
        },
      ]);
      setIsLoading(false);

      if (error) {
        console.log(error?.message);
        alert(error.message);
        return;
      }

      setInputTitle("");
      setInputBody("");

      alert("You successfully added a new post");
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (isEmpty(inputTitle) || isEmpty(inputBody)) {
      console.log("Error");
      return;
    }

    addNewPost();
  };

  const onChangeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  const onChangeBodyHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputBody(event.target.value);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          onChange={onChangeTitleHandler}
          value={inputTitle}
        />
      </div>
      <div className={classes.control}>
        <label>Body</label>
        <textarea
          id="body"
          rows={10}
          onChange={onChangeBodyHandler}
          value={inputBody}
        />
      </div>
      <div className={classes.actions}>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default NewPost;
