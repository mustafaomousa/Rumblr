import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const sessionUser = useSelector((state) => state.session.user);

  return sessionUser ? (
    <Route {...props} component={Component} />
  ) : (
    <Redirect to="/" />
  );
};

export default ProtectedRoute;
