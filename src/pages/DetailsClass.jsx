import React, { useEffect } from "react";
import Youtube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";

import {
  statusCourses,
  watchCourse,
  messageCourse,
} from "../store/actions/courses";

import SidebarClass from "../parts/SidebarClass";

import courses from "../constants/api/courses";

import Loading from "../parts/Loading";
import Centered from "../parts/Centered";
import { useParams, useLocation } from "react-router-dom";

export default function DetailsClass() {
  const dispatch = useDispatch();

  const match = useParams(
    "/courses/:class/:chapter/:uid"
  );

  console.log(match);

  const COURSES = useSelector((state) => state.courses);


  useEffect(() => {
    window.scroll(0, 0);
    dispatch(statusCourses("loading"));
    courses
      .details(match.class)
      .then((res) => {
        console.log(res);
        if (res.chapters.length === 0)
          throw new Error("Class might be not ready yet");
        else dispatch(watchCourse(res));
      })
      .catch((err) => {
        dispatch(messageCourse(err?.response?.data?.message ?? "Class might be not ready yet"));
      });
  }, [match.class, dispatch]);

  if (COURSES.status === "loading") return <Loading></Loading>;
  if (COURSES.status === "error")
    return <Centered>{COURSES?.message ?? "Error here"}</Centered>;

  let currentChapter;
  let currentLesson;
  let currentQuiz;
  if (COURSES.status === "ok" && COURSES?.data?.[match.class]?.chapters) {
    currentChapter =
      COURSES?.data?.[match.class]?.chapters?.find(
        (chapter) => +chapter.id === +match.chapter
      ) ?? COURSES.data[match.class]?.chapters[0];

    currentLesson =
      currentChapter?.lessons?.find((lesson) => lesson.video === match.uid) ??
      currentChapter?.lessons?.[0];

    currentQuiz =
      currentChapter?.quizzes?.find((quiz) => quiz.id === match.uid) ??
      currentChapter?.quizzes?.[0];
  }

  // console.log(currentChapter);
  // console.log(currentLesson);
  // console.log(currentQuiz);

  function nextVideo() {
    const currentLessonIndex = currentChapter.lessons.findIndex(
      (lesson) => lesson.video === currentLesson.video
    );
    const nextLesson = currentChapter.lessons[currentLessonIndex + 1];
    if (nextLesson) {
      window.location.href = `/courses/${match.class}/${currentChapter.id}/${nextLesson.video}`;
    } else {
      const nextChapter = COURSES.data[match.class].chapters.find(
        (chapter) => chapter.id === currentChapter.id + 1
      );
      if (nextChapter) {
        window.location.href = `/courses/${match.class}/${nextChapter.id}/${nextChapter.lessons[0].video}`;
      } else {
        window.location.href = `/courses/${match.class}/${currentChapter.id}/${currentLesson.video}`;
      }
    }
  }
  return (
    <div className="flex">
      {COURSES.data?.[match.class]?.chapters?.length > 0 && (
        <>
          <SidebarClass
            data={COURSES.data[match.class]}
            defaultUri={`/courses/${match.class}/${currentChapter.id}/${currentLesson.video}`}
          ></SidebarClass>
          <main className="flex-1">
            <div className="px-4 sm:px-16">
              <section className="flex flex-col pl-12 mt-8 sm:pl-0">
                <h1 className="text-xl font-medium text-gray-900 sm:text-4xl">
                  {currentLesson?.name ?? "Lesson Name"}
                </h1>
                <p className="text-sm text-gray-600 sm:text-lg">
                  Materi bagian dari {currentChapter?.name ?? "Chapter Name"}
                </p>
              </section>
              <section className="flex flex-col mt-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={nextVideo}
                      className="flex items-center px-4 py-2 space-x-2 text-sm font-medium text-white rounded-lg bg-secondary"
                    >
                      <span>Next Lesson</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </section>
              <section className="flex flex-col mt-8">
                <div className="flex items-center justify-start -mx-4">
                  <div className="w-full px-4">
                    <div className="relative">
                      <div className="video-wrapper">
                        {currentLesson?.video && (
                          <Youtube
                            videoId={currentLesson?.video}
                            id={currentLesson?.video}
                            opts={{
                              playerVars: {
                                autoplay: 1,
                                controls: 1,
                                showinfo: 0,
                                rel: 0,
                              },
                            }}
                          ></Youtube>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
