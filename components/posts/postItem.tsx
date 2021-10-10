import React from "react";

import classes from "./postItem.module.css";

const PostItem: React.FC<{
  title: string;
  userName: string;
  body: string;
  posted_at: string;
}> = (props) => {
  return (
    <div className={classes.card}>
      <div className={classes.head}>
        <p>
          {props.title} by {props.userName}
        </p>
      </div>
      <div className={classes.body}>
        <p>{props.body}</p>
      </div>
      <div className={classes.bottom}>
        <p>{props.posted_at}</p>
      </div>
    </div>
  );
};

export default PostItem;
