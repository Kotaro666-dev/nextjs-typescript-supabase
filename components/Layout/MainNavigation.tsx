import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAuthDispatch } from "../../store/store";
import { authActions } from "../../store/auth-slice";
import { supabase } from "../helper/SupabaseClient";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const router = useRouter();
  const authDispatch = useAuthDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

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
  };

  return (
    <header className={classes.header}>
      <div onClick={onLogoClickHandler} className={classes.logo}>
        Next js
      </div>

      <nav>
        <ul>
          <li>{!isLoggedIn && <Link href="/signin">SignIn</Link>}</li>
          <li>{!isLoggedIn && <Link href="/signup">SignUp</Link>}</li>
          <li>
            {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
