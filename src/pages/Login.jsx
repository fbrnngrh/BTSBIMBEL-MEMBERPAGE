import React, { useEffect } from "react";

import Header from "../parts/Header";
import Footer from "../parts/Footer";
import LoginForm from "../parts/LoginForm";

export default function Login() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <section className="container px-4 pt-10 mx-auto guest-page">
        <Header onLight></Header>
      </section>
      <section className="container px-4 pt-10 mx-auto">
        <LoginForm></LoginForm>
      </section>
      <section className="py-12 mt-24 bg-primary">
        <Footer></Footer>
      </section>
    </>
  );
}
