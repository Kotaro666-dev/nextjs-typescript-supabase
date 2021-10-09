import { useState } from "react";
import { useRouter } from "next/router";
import {
  validateEmail,
  validatePassword,
} from "../../components/helper/ValidateInput";
import { authActions } from "../../store/auth-slice";
import { useAuthDispatch } from "../../store/store";
import { supabase } from "../../components/helper/SupabaseClient";

import classes from "./index.module.css";

const SignIn: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const router = useRouter();
  const authDispatch = useAuthDispatch();

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const { user, error } = await supabase.auth.signIn({
        email: inputEmail,
        password: inputPassword,
      });

      if (error) {
        console.log(error?.message);
        alert(error.message);
        return;
      }

      setIsLoading(false);

      // Update store
      authDispatch(authActions.signIn(user?.id));

      alert("You successfully logged in.");

      // reset Data
      setInputEmail("");
      setInputPassword("");

      // Go back home
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = (event: React.FormEvent): void => {
    event.preventDefault();

    if (!validateEmail(inputEmail) || !validatePassword(inputPassword)) {
      console.log("Error");
      return;
    }

    handleSignIn();
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
          type="password"
          id="Password"
          onChange={onChangeInputPasswordHandler}
          value={inputPassword}
        />
      </div>
      <div>
        <button type="submit">Sign In</button>
      </div>
    </form>
  );
};

export default SignIn;
