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
import { FetchUserList, DeleteUser } from "store/actions/users";
import { toast } from "react-toastify";
import Loading from "parts/Loading";
import { Link } from "react-router-dom";


const TABLE_HEAD = ["name", "role", "profession", "Aksi"];

const ListUser = (props) => {
  useEffect(() => {
    props.fetchUsers();
    console.log(props.users);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      props.deleteUser(id);
      props.fetchUsers();
      toast.success("User deleted successfully");
    }
  };

  return (
    props.users.isLoading ? <Loading /> : 
    props.users.error ? <h1>{props.users.error}</h1> : 
    <Card className="w-full h-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex items-center justify-between gap-8 mb-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Users List
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all users
            </Typography>
          </div>
          <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
            <Link to="/add-user">
            <Button className="flex items-center gap-3" color="blue" size="sm">
              <UserPlusIcon strokeWidth={2} className="w-4 h-4" /> Add member
            </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="w-5 h-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-0 overflow-scroll">
        <table className="w-full mt-4 text-left table-auto min-w-max">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {props.users.userlist &&
              props.users.userlist.map((user) => (
                <tr key={user.id}>
                  <td className="p-4 border-t border-blue-gray-100">
                    <div className="flex items-center gap-4">
                      {user.avatar ? (
                        <Avatar src={user.avatar} alt={user.name} size="sm" />
                      ) : (
                        <DefaultUser className="w-8 h-8 fill-indigo-500"></DefaultUser>
                      )}

                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.name}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {user.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-t border-blue-gray-100">
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.role}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-t border-blue-gray-100">
                    <div className="w-max">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {user.profession}
                      </Typography>
                    </div>
                  </td>
                  <td className="p-4 border-t border-blue-gray-100">
                    <Tooltip content="Delete User">
                      <IconButton
                        variant="text"
                        color="red"
                        onClick={() => handleDelete(user.id)}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between p-4 border-t border-blue-gray-50">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );

};

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(FetchUserList()),
    deleteUser: (id) => dispatch(DeleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
