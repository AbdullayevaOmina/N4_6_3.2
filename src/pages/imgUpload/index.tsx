import { useState } from "react";
import { Post } from "@httpModel";
import { toast } from "react-toastify";

const Index = () => {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await Post("/images/upload", formData);
        toast.success(response.data.message);
        setImg(response?.data?.path);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error("file tanlanmadi.");
    }
  };

  return (
    <div>
      <h2 className="text-center my-4">Image Upload</h2>
      <form className="d-flex gap-3" onSubmit={handleSubmit}>
        <input type="file" className="form-control" onChange={handleChange} />
        <button type="submit" className="btn btn-primary">
          Upload
        </button>
      </form>

      <img src={img} className="mt-5 w-96" />
    </div>
  );
};

export default Index;
