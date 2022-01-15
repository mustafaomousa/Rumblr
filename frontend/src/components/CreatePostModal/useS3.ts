import ReactS3Client from "react-aws-s3-typescript";
import { useAppSelector } from "../..";

const useS3 = () => {
  const sessionUser = useAppSelector((state) => state.session.user);

  const s3 = new ReactS3Client({
    bucketName: "rumblr-app",
    dirName: sessionUser.username,
    region: "us-east-2",
    accessKeyId: process.env.REACT_APP_ACCESS_ID ?? "",
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_ID ?? "",
  });

  return s3;
};

export default useS3;
