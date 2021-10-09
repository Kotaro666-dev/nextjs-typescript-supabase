import React, { useEffect } from "react";
import { supabase } from "../components/helper/SupabaseClient";
import { authActions } from "../store/auth-slice";
import { useAuthDispatch } from "../store/store";

const HomePage = () => {
  const authDispatch = useAuthDispatch();

  useEffect(() => {
    const session = supabase.auth.session();
    console.log(session);
    if (session) {
      authDispatch(authActions.signIn(session.user?.id));
    }
  }, [authDispatch]);

  return <h1>Hello world!</h1>;
};

export default HomePage;
