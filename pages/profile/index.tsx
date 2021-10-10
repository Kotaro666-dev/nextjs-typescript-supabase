import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import classes from "./index.module.css";

const Profile = () => {
  const { username, email } = useSelector((state: RootState) => state.user);
  return (
    <div>
      <h1>Username: {username}</h1>
      <h1>Email: {email}</h1>
    </div>
  );
};

export default Profile;
