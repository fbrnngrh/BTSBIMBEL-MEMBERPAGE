import React from "react";
import SidebarAdmin from "parts/SidebarAdmin";
import { addCourseAsync } from "store/actions/courses";
import { useDispatch } from "react-redux";
import useForm from "helpers/hooks/useForm";
import Input from "components/Form/Input";
import Select from "components/Form/Select";
import { useNavigate } from "react-router-dom";
import image2base64 from "utils/image2base64";
import media from "constants/api/media";

const AddCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addPicture = React.useRef(null);

  const previewImage = (e) => {
    e.persist();
    image2base64(e.target.files[0]).then((image) => {
      setState({
        target: {
          name: e.target.name,
          value: image,
        },
      });
    });
  };



  const [{ name, thumbnail, level, description, price, status }, setState] =
    useForm({
      name: "",
      thumbnail: "",
      level: "",
      description: "",
      price: "",
      status: "",
    });

  const [errors, setErrors] = React.useState(null);

  const [preview, setPreview] = React.useState(null);

    const handleThumbnail = (e) => {    
    e.preventDefault();
    image2base64(e.target.files[0]).then((image) => {
        setState({
            target: {
            name: e.target.name,
            value: image,
            },
        });
    });

    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    media
        .upload(formData)
        .then((res) => {
        setState({
            target: {
            name: "thumbnail",
            value: res.data.url,
            },
        });
        }
        )
        .catch((err) => {
        setErrors(err?.response?.data?.message);
        }
        );
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      thumbnail,
      level,
      description,
      price,
      status,
    };

    dispatch(addCourseAsync(data));
    navigate("/managed-courses");

  };

  return (
    <div className="flex">
      <SidebarAdmin></SidebarAdmin>
      <main className="flex-1">
        <div className="px-4 sm:px-16">
          <section className="flex flex-col pl-12 mt-8 sm:pl-0">
            <h1 className="text-xl font-medium text-gray-900 sm:text-4xl">
              Add Course
            </h1>
            <p className="text-sm text-gray-600 sm:text-lg">
              Kelola semua data course
            </p>
          </section>
          <section className="flex flex-col pl-12 mt-8 sm:pl-0">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col mt-8">
                <Input
                    type="text"
                    name="name"
                    value={name}
                    onChange={setState}
                    placeholder="Nama Course"
                    className="bg-gray-100 focus:bg-white"
                />
                <Input
                    type="text"
                    name="level"
                    value={level}
                    onChange={setState}
                    placeholder="level Course"
                    className="bg-gray-100 focus:bg-white"
                />
                <Input
                    type="text"
                    name="description"
                    value={description}
                    onChange={setState}
                    placeholder="description Course"
                    className="bg-gray-100 focus:bg-white"
                />
                <Input
                    type="text"
                    name="price"
                    value={price}
                    onChange={setState}
                    placeholder="price Course"
                    className="bg-gray-100 focus:bg-white"
                />
                <Input
                    type="text"
                    name="status"
                    value={status}
                    onChange={setState}
                    placeholder="status Course"
                    className="bg-gray-100 focus:bg-white"
                />
                
                <div className="flex justify-start mt-8">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 w-1/2"
                  >
                    Save Now
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AddCourse;
