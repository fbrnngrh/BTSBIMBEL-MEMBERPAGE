import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { ReactComponent as DefaultUser } from "assets/images/default-avatar.svg";
import { fetchCoursesAsync, deleteCourseAsync } from "store/actions/courses";
import { toast } from "react-toastify";
import Loading from "parts/Loading";
import { Link } from "react-router-dom";

const ListCourse = (props) => {
  useEffect(() => {
    props.fetchCourses();
    console.log(props.courses);
  }, [props.courses.data]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filter = Object.values(props.courses.data)?.filter?.((item) => {
      return item.name.toLowerCase().includes(value);
    });
    props.fetchCourses(filter);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      props.deleteCourse(id);
      props.fetchCourses();
      toast.success("Course deleted successfully");
    }
  };

  const TABLE_HEAD = [
    "thumbnail",
    "name",
    "level",
    "type",
    "price",
    "status",
    "Aksi",
  ];

  return props.courses.isLoading ? (
    <Loading />
  ) : props.courses.error ? (
    <h1>{props.courses.error}</h1>
  ) : (
    <Card className="w-full h-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8 mb-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Courses List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all courses
            </Typography>
          </div>
          <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
            <Link to="/add-course">
              <Button
                className="flex items-center gap-3"
                color="blue"
                size="sm"
              >
                <UserPlusIcon strokeWidth={2} className="w-4 h-4" /> Add course
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full px-4 py-3 rounded-lg bg-blue-gray-50">
          <MagnifyingGlassIcon className="w-5 h-5 text-blue-gray-500" />
          <Input placeholder="Search users" onChange={(e) => handleSearch(e)} />
        </div>
      </CardHeader>
      <CardBody>
        <table className="w-full">
          <thead>
            <tr>
              {TABLE_HEAD.map((item, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-sm font-medium text-left text-blue-gray-500"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(props.courses.data)?.map?.((item, index) => {
              return (
                <tr key={index}>
                  <td className="px-4 py-3 text-sm text-blue-gray-500">
                    <div className="flex items-center text-sm">
                      <div>
                        <img
                          className="object-cover w-32 h-24 "
                          src={item.thumbnail}
                          alt=""
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-gray-500">
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold text-black">{item.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-gray-500">
                    {item.level}
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-gray-500">
                    {item.type}
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-gray-500">
                    {item.price}
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-gray-500">
                    {item.status}
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-gray-500">
                    <div className="flex items-center space-x-4 text-sm">
                      <Link to={`/edit-course/${item.id}`}>
                        <Tooltip
                          color="lightBlue"
                          content="Edit"
                          size="regular"
                          placement="top"
                        >
                          <IconButton color="lightBlue" size="regular">
                            <PencilIcon className="w-5 h-5" />
                          </IconButton>
                        </Tooltip>
                      </Link>
                      <Tooltip
                        color="red"
                        content="Delete"
                        size="regular"
                        placement="top"
                      >
                        <IconButton
                          color="red"
                          size="regular"
                          onClick={() => handleDelete(item.id)}
                        >
                          <TrashIcon className="w-5 h-5" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            })}

            {/* {props.courses.data.map((item, index) => (
                        
                    ))} */}
          </tbody>
        </table>
      </CardBody>
      <CardFooter>
        <div className="flex items-center justify-end gap-4"></div>
      </CardFooter>
    </Card>
  );
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourses: () => dispatch(fetchCoursesAsync()),
    deleteCourse: (id) => dispatch(deleteCourseAsync(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCourse);
