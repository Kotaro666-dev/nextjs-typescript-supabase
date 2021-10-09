import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const router = useRouter();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const onLogoClickHandler = () => {
    router.push("/");
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
          <li>{isLoggedIn && <button>Logout</button>}</li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
