import React, { useState } from "react";
import { useRouter } from "next/router";

import {
  validateEmail,
  validatePassword,
} from "../../components/helper/ValidateInput";

import classes from "./index.module.css";

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const router = useRouter();

  const onSubmitHandler = (event: React.FormEvent): void => {
    event.preventDefault();

    if (!validateEmail(inputEmail) || !validatePassword(inputPassword)) {
      console.log("Error");
      return;
    }

    setIsLoading(true);
    // Post data

    setIsLoading(false);

    // reset Data
    setInputEmail("");
    setInputPassword("");

    // Go back home
    router.replace("/");
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
          type="text"
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

export default SignIn;
