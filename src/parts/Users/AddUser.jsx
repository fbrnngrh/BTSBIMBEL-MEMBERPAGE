import useForm from "helpers/hooks/useForm";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FunctionAddUser } from "store/actions/users";
import Select from "components/Form/Select";
import Input from "components/Form/Input";
import SidebarAdmin from "parts/SidebarAdmin";

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    { name, email, password, profession, otherProfession, role },
    setState,
  ] = useForm({
    name: "",
    email: "",
    password: "",
    profession: "",
    otherProfession: "",
    role: "",
  });

  const [errors, seterrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userobj = {
      name,
      email,
      password,
      profession: profession === "others" ? otherProfession : profession,
      role,
    };

    dispatch(FunctionAddUser(userobj))
    navigate("/managed-users");
  };

  return (
    <div className="flex">
      <SidebarAdmin></SidebarAdmin>
      <main className="flex-1">
        <div className="px-4 sm:px-16">
          <section className="flex flex-col pl-12 mt-8 sm:pl-0">
            <h1 className="text-xl font-medium text-gray-900 sm:text-4xl">
                Add User
            </h1>
            <p className="text-sm text-gray-600 sm:text-lg">
              Kelola semua data user
            </p>
           
          </section>
            
          <section className="flex flex-col pl-12 mt-8 sm:pl-0">
            <form onSubmit={handleSubmit}>
              <Input
                value={name}
                error={errors?.name?.message}
                name="name"
                onChange={setState}
                placeholder="Your Name"
              />
              <Input
                value={email}
                error={errors?.email?.message}
                name="email"
                onChange={setState}
                placeholder="Your Email Address"
              />
              <Input
                value={password}
                error={errors?.password?.message}
                name="password"
                type="password"
                onChange={setState}
                placeholder="Your Password"
              />
              <Input 
                type="text"
                value={profession}
                error={errors?.profession?.message}
                name="profession"
                onChange={setState}
                placeholder="Your Profession"
                />
                <Input
                type="text"
                value={role}
                error={errors?.role?.message}
                name="role"
                onChange={setState}
                placeholder="Your Role"
                />
              <button
                type="submit"
                className="w-full px-4 py-3 mt-3 text-lg text-white bg-red-600 rounded-lg shadow-xl hover:bg-red-700"
              >
                Tambah User
              </button>
              
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
