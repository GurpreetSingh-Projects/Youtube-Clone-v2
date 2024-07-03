import { useParams } from "react-router-dom";

const ChannelDetail = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default ChannelDetail;
