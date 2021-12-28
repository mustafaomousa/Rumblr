import { useRef } from "react";

const useBottomScrollListener = () => {
  const discoverPostsRef = useRef();

  const onScroll = () => {
    if (discoverPostsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        discoverPostsRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log("reached bottom");
      }
    }
  };

  return [discoverPostsRef, onScroll];
};

export default useBottomScrollListener;
