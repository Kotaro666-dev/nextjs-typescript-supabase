import React, { useEffect } from "react";
import { supabase } from "../components/helper/SupabaseClient";
import { authActions } from "../store/auth-slice";
import { useAuthDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";

const HomePage = () => {
  const authDispatch = useAuthDispatch();
  const { isLoggedIn, idToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const getUserData = async (uid: string) => {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("uid", uid);
      if (data) {
        console.log(data);
      }
    };

    const session = supabase.auth.session();
    console.log(session);
    if (session) {
      const uid = session.user?.id as string;
      authDispatch(authActions.signIn(uid));
      getUserData(uid);
    }
  }, [authDispatch]);

  return (
    <div>
      {isLoggedIn && <h1>{idToken}</h1>},
      {!isLoggedIn && <h1>You are not loggedin</h1>}
    </div>
  );
};

export default HomePage;
