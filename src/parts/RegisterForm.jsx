import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import users from "../constants/api/users";

import useForm from "../helpers/hooks/useForm";
import fieldErrors from "../helpers/fieldErrors";

import Select from "../components/Form/Select";
import Input from "../components/Form/Input";

function RegisterForm() {
  const navigate = useNavigate();
  const [
    { name, email, password, profession, otherProfession },
    setState,
  ] = useForm({
    name: "",
    email: "",
    password: "",
    profession: "",
    otherProfession: "",
  });

  const [errors, seterrors] = useState(null);

  function submit(e) {
    e.preventDefault();

    users
      .register({
        name,
        email,
        password,
        profession: profession === "others" ? otherProfession : profession,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        seterrors(err?.response?.data?.message);
      });
  }

  const ERRORS = fieldErrors(errors);

  return (
    <div className="flex items-center justify-center pb-24">
      <div className="w-full sm:w-3/12">
        <h1 className="mb-6 text-4xl text-gray-900">
          <span className="font-bold">Grow Skills</span> From, <br />
          Anywhere
        </h1>
        <form onSubmit={submit}>
          <Input
            value={name}
            error={ERRORS?.name?.message}
            name="name"
            onChange={setState}
            placeholder="Your Name"
            labelName="Full Name"
          />

          <Input
            value={email}
            error={ERRORS?.email?.message}
            name="email"
            type="email"
            onChange={setState}
            placeholder="Your email address"
            labelName="Email Address"
          />

          <Input
            value={password}
            error={ERRORS?.password?.message}
            name="password"
            type="password"
            onChange={setState}
            placeholder="Your Password"
            labelName="Password"
          />

          <Select
            labelName="Occupation"
            name="profession"
            value={profession}
            fallbackText="Select your focus"
            onClick={setState}
          >
            <option value="">Select your focus</option>
            <option value="Web Developer">Web Designer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="others">others</option>
          </Select>

          {profession === "others" && (
            <Input
              value={otherProfession}
              error={ERRORS?.otherProfession?.message}
              name="otherProfession"
              type="text"
              onChange={setState}
              placeholder="Your occupation"
              labelName="Other Occupation"
            />
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 mt-4 text-white transition-all duration-200 bg-secondary shadow-inner hover:bg-secondary focus:outline-none"
          >
            Daftar
          </button>
        </form>
      </div>

      <div className="hidden w-1/12 sm:block"></div>

      <div className="flex justify-end hidden w-5/12 pt-24 pr-16 sm:block">
        <div className="relative" style={{ width: 369, height: 440 }}>
          <div
            className="absolute left-0 -mt-8 -ml-16 border-2 border-secondary"
            style={{ width: 324, height: 374 }}
          ></div>
          <div className="absolute w-full h-full -mb-8 -ml-8">
            <img src="/assets/images/james.jpg" alt="james jelek" />
          </div>
          <div
            className="absolute bottom-0 right-0 z-10 px-4 py-3 -mr-12 bg-white"
            style={{ width: 290 }}
          >
            <p className="mb-2 text-gray-900">
              Semua materi terstruktrur baik dan mentor yang sangat lihai
            </p>
            <span className="text-gray-600">James, Apps Developer</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default  RegisterForm;
