import React from "react";

import { ReactComponent as ArrowBack } from "../assets/images/icon-arrow-back.svg";

import { Link, useLocation } from "react-router-dom";

function SidebarClass({ data, defaultUri }) {

  const match = useLocation();


  const [toggleMenu, setToggleMenu] = React.useState(false);

  const getNavLinkClass = (path) => {
    return match.pathname === path || defaultUri === path
      ? "text-red-500"
      : "text-white";
  };

  const sidebarStyle = {
    width: window.innerWidth < 640 ? 280 : 280,
    left: window.innerWidth < 640 && !toggleMenu ? "-280px" : 0,
  };

  const list = [];
  data.chapters.forEach((chapter, index) => {
    list.push(
      <li key={`${chapter.course_id}-${index}`}>
        <span className="relative block px-5 py-3 text-left text-white bg-secondary nav-header">
          {chapter?.name ?? "Chapter name"}
        </span>
      </li>
    );
    if (chapter?.lessons?.length > 0)
      chapter.lessons.forEach((lesson, index2) => {
        list.push(
          <li key={`${chapter.course_id}-${lesson.id}-${index2}`}>
            <Link
              className={[
                "relative flex items-center py-3 px-5 transition-all duration-200 w-full text-left truncate ",
                getNavLinkClass(
                  `/courses/${data.id}/${chapter.id}/${lesson.video}`
                ),
              ].join(" ")}
              to={`/courses/${data.id}/${chapter.id}/${lesson.video}`}
            >
              {lesson?.name ?? "Lesson name"}
            </Link>
          </li>
        );
      });
  });

  return (
    <>
      <div className="flex sm:hidden">
        <button
          onClick={() => setToggleMenu((prev) => !prev)}
          className={["toggle z-50", toggleMenu ? "active" : ""].join(" ")}
        ></button>
      </div>
      <aside
        className="fixed z-50 h-screen max-h-screen min-h-full overflow-y-auto transition-all duration-300 bg-primary sm:relative"
        style={sidebarStyle}
      >
        {toggleMenu && (
          <div
            className="overlay"
            onClick={() => setToggleMenu((prev) => !prev)}
          ></div>
        )}
        <div
          className="fixed z-10 flex flex-col content-between h-screen max-h-screen bg-indig-1000"
          style={{ width: 280 }}
        >
          <ul className="mt-12 overflow-y-auto main-menu">
            <li>
              <Link
                className="relative flex items-center w-full px-5 py-3 mb-12 text-left text-white"
                to="/"
              >
                <ArrowBack className="mr-2 fill-white"></ArrowBack>
                Back to Home
              </Link>
            </li>
            {list}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default SidebarClass;
