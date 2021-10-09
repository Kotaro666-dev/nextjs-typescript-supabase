import Link from "next/link";
import { useRouter } from "next/router";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const router = useRouter();

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
          <li>
            <Link href="/signin">SignIn</Link>
          </li>
          <li>
            <Link href="/signup">SignUp</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
