import { Post } from "../../pages";

const PostItem: React.FC<{
  title: string;
  userName: string;
  body: string;
  posted_at: string;
}> = (props) => {
  return (
    <div>
      <div>
        <p>{props.title}</p>
        <p>{props.userName}</p>
      </div>
      <div>
        <p>{props.body}</p>
      </div>
      <div>
        <p>{props.posted_at}</p>
      </div>
    </div>
  );
};

export default PostItem;
