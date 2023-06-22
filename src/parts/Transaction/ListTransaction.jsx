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
import { fetchOrderList } from "store/actions/orders";
import { toast } from "react-toastify";
import Loading from "parts/Loading";
import { Link } from "react-router-dom";

const ListOrders = (props) => {
    
    useEffect(() => {
        props.fetchOrders();
        console.log(props.orders);
    }, []);

    const TABLE_HEAD = [
        "id",
        "user_id",
        "status",
        "course purchased",
    "price"
      ];

  return (
    props.orders.isLoading ? <Loading /> :
    props.orders.error ? <h1>{props.orders.error}</h1> :
    <Card className="w-full h-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="flex items-center justify-between gap-8 mb-8">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        Orders List
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        See information about all orders
                    </Typography>
                </div>
                <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
                    <Link to="/add-order">
                        <Button className="flex items-center gap-3" color="blue" size="sm">
                            <UserPlusIcon strokeWidth={2} className="w-4 h-4" /> Add order
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col w-full gap-4">
                <Input  
                    type="text"
                    color="lightBlue"
                    placeholder="Search order"
                    size="regular"
                    outline={false}
                    // onChange={handleSearch}
                    icon={<MagnifyingGlassIcon size={24} />}
                />
            </div>
        </CardHeader>
        <CardBody>
            <div className="overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse">
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
                        {Object.values(props.orders.data)?.map((item, index) => (
                            <tr
                                key={index}
                                className="align-top bg-white border-b text-blue-gray-500 border-blue-gray-200"
                            >
                                <td className="px-4 py-3 text-sm">
                                    <div className="flex items-center">
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-blue-gray-900">
                                                {item.id}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <p className="text-sm font-medium text-blue-gray-900">
                                        {item.user_id}
                                    </p>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <p className="text-sm font-medium text-blue-gray-900">
                                        {item.status}
                                    </p>
                                </td>
                                <td className="px-4 py-3 text-sm">
                                    <div className="flex items-center">
                                        <div className="ml-3 ">
                                            <img src={item.metadata.course_thumbnail} alt="" className="w-20 h-20 rounded-md" />
                                        </div>
                                    <p className="ml-4 text-sm font-medium text-blue-gray-900">
                                        {item.metadata.course_name}
                                    </p>
                                    </div>
                                </td>
                               <td className="px-4 py-3 text-sm">
                                    <p className="text-sm font-medium text-blue-gray-900">
                                        {item.metadata.course_price}
                                    </p>
                                </td>
                            
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </CardBody>
    </Card>                        
  );

};

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(fetchOrderList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOrders);
