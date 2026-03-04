import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { SearchItem } from "../types/SearchTypes";
import toast from "react-hot-toast";

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [details, setDetails] = useState<SearchItem | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/get/${id}`);
        const data: SearchItem = await response.json();
        setDetails(data);
      } catch (error) {
        console.log("Failed to get details: " + error);
        toast.error("Something went wrong!", {
          style: {
            borderRadius: "10px",
            background: "#1fb854",
            color: "#1b1717",
          },
        });
      }
    };

    fetchDetails();
  }, [id]);

  return <div>{details?.title}</div>;
};

export default DetailPage;
