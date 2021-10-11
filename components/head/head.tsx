import Head from "next/head";
import React from "react";

const MyHead: React.FC = (props) => {
  return (
    <>
      <Head>
        <title>Next.js - TypeScript - Supabase</title>
        <meta
          name="description"
          content="Next.js - TypeScript - Supabase 使用のデモサイトです。"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {props.children}
    </>
  );
};

export default MyHead;
