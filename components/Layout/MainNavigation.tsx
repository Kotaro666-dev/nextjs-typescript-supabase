import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAuthDispatch, useUserDispatch } from "../../store/store";
import { userActions } from "../../store/user-slice";
import { authActions } from "../../store/auth-slice";
import { supabase } from "../helper/SupabaseClient";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const router = useRouter();
  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const userName = useSelector((state: RootState) => state.user.username);

  const onLogoClickHandler = () => {
    router.push("/");
  };

  const logoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error.message);
      return;
    }
    authDispatch(authActions.logout());
    userDispatch(
      userActions.updateUser({
        payload: {
          userName: "",
          email: "",
        },
      })
    );
  };

  return (
    <header className={classes.header}>
      <div onClick={onLogoClickHandler} className={classes.logo}>
        Next js
      </div>

      <nav>
        <ul>
          <li>{!isLoggedIn && <Link href="/signin">Sign In</Link>}</li>
          <li>{!isLoggedIn && <Link href="/signup">Sign Up</Link>}</li>
          <li>{isLoggedIn && <Link href="/new-post">Add new post</Link>}</li>
          <li>
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </li>
          <li>
            {isLoggedIn && <div className={classes.profile}>{userName}</div>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
