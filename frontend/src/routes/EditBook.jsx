import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { BASE_URL } from "../../config";

import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_URL}/books/${id}`)
      .then((response) => {
        setTitle(response.data.data.title);
        setAuthor(response.data.data.author);
        setPublishYear(response.data.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const editBookHandler = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);

    // storing data on database by sending post request
    axios
      .put(`${BASE_URL}/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book updated successfully!", { variant: "success" });

        // Navigates to home page
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("An error happened. Please check console");
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={editBookHandler}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
