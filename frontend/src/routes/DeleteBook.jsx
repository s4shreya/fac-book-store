import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../config";

import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const deleteBookHandler = () => {
    setLoading(true);

    // Axios http request to delete the book with the id
    axios
      .delete(`${BASE_URL}/books/${id}`)
      .then((response) => {
        setLoading(false);
        enqueueSnackbar("Book deleted successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(`error occurred ${error}`);
        enqueueSnackbar("Error occurred", { variant: "error" });
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={deleteBookHandler}
        >
          Yes. Delete it!
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
