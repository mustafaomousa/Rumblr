import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./index.css";

const FeedPage = () => {
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) return <Redirect to="/" />;

  return (
    <div>
      <p>Hi</p>
    </div>
  );
};

export default FeedPage;
