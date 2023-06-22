import axios from 'axios';
import courses from 'constants/api/courses';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';

export default function SubmissionForm() {

  const [file, setFile] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [courses, setCourses] = useState(null);
  const [notification, setNotification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const USERS = useSelector((state) => state.users);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get("http://143.198.217.253/api/courses")
        console.log(res.data.data.data);
        setCourses(res.data.data.data);
      } catch (error) {
        console.log(error.response);
        // tangani error
      }
    };
    fetchCourse();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCourseIdChange = (e) => {
    setCourseId(e.target.value);
  }

    const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("filename", file);
    formData.append("course_id", courseId);
    formData.append("user_id", USERS.id);

    try {
      const res = await axios.post("http://143.198.217.253/api/submissions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      console.log(res);
      setNotification(res.data.message);
      setIsSubmitting(true);

      setTimeout(() => {
        setFile(null);
        setCourseId("");
        setIsSubmitting(false);
        setNotification("");
      }, 3000);

      return res.data;

    } catch (error) {
      console.log(error.response.data.message);
      setNotification("Gagal mengirim tugas");
      // tanngani error
    }
    }


  return (
    <div className="max-w-md ">
    <div className="bg-white shadow-md rounded px-8 py-6 mb-4 flex">
      <div className="w-2/3 pr-8">
        {/* Paragraf penjelasan */}
        {
          notification ? (
            <div className="bg-green-700 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{notification}</span>
            </div>
          ) :
          (
            <div className="bg-blue-700 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">Silahkan ikuti langkah dibawah untuk mengirim tugas</span>
            </div>
          )
        }
        <p className="text-gray-700 text-sm mb-4">
          Untuk mengirim tugas, ikuti langkah-langkah berikut:
        </p>
        <ol className="list-decimal ml-6">
          <li className="text-gray-700 text-sm">
            Pilih kursus yang sesuai dengan tugas yang akan Anda kirim dari daftar dropdown di bawah.
          </li>
          <li className="text-gray-700 text-sm">
            Pilih file tugas yang ingin Anda kirim dengan mengklik tombol "Choose File" di bawah "Submission File (RAR)".
          </li>
          <li className="text-gray-700 text-sm">
            Pilih file RAR yang berisi tugas yang sudah Anda selesaikan, lalu klik "Open".
          </li>
          <li className="text-gray-700 text-sm">
            Setelah memilih file, Anda dapat melihat nama file yang sudah terpilih.
          </li>
          <li className="text-gray-700 text-sm">Terakhir, klik tombol "Submit" untuk mengirimkan tugas Anda.</li>
        </ol>
      </div>
      <div className="w-1/3">
        <form onSubmit={handleSubmit}>
          {/* Dropdown select untuk Course ID */}
          <div className="mb-4">
            <label htmlFor="course_id" className="block text-gray-700 text-sm font-bold mb-2">
              Course ID
            </label>
            <select
              id="course_id"
              value={courseId}
              onChange={handleCourseIdChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Pilih Course</option>
              {
                courses?.map?.((course) => {
                  return (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  )
                })
              }
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="submission" className="block text-gray-700 text-sm font-bold mb-2">
              Submission File (RAR)
            </label>
            <input
              type="file"
              accept=".rar"
              id="submission"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}
