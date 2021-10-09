import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAuthDispatch } from "../../store/store";
import { authActions } from "../../store/auth-slice";

import {
  isEmpty,
  validateEmail,
  validatePassword,
} from "../../components/helper/ValidateInput";

import classes from "./index.module.css";

const SignUp: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const router = useRouter();
  const authDispatch = useAuthDispatch();

  const onSubmitHandler = (event: React.FormEvent): void => {
    event.preventDefault();

    if (
      isEmpty(inputName) ||
      !validateEmail(inputEmail) ||
      !validatePassword(inputPassword)
    ) {
      console.log("Error");
      return;
    }

    setIsLoading(true);
    // Post data

    setIsLoading(false);

    // reset Data
    setInputEmail("");
    setInputPassword("");

    // Update store
    authDispatch(authActions.signIn("data"));

    // Go back home
    router.replace("/");
  };

  const onChangeInputNameHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputName(event.target.value);
  };

  const onChangeInputEmailHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputEmail(event.target.value);
  };

  const onChangeInputPasswordHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputPassword(event.target.value);
  };

  return (
    <form onSubmit={onSubmitHandler} className={classes.form}>
      <div>
        <label>Name</label>
        <input
          type="text"
          id="Name"
          onChange={onChangeInputNameHandler}
          value={inputName}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          id="Email"
          onChange={onChangeInputEmailHandler}
          value={inputEmail}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          id="Password"
          onChange={onChangeInputPasswordHandler}
          value={inputPassword}
        />
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
};

export default SignUp;
