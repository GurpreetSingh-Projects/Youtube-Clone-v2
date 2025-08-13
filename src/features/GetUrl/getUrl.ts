import { useParams } from "react-router-dom";

export default function useGetUrl() {
  const { id } = useParams();
  return () => {
    return id;
  };
}
