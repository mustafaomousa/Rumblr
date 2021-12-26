import { useRef } from "react";

const useNotification = () => {
  const notificationRef = useRef();

  return notificationRef;
};

export default useNotification;
