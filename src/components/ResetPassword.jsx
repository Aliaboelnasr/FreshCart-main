import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserTokenContext } from '../context/UserToken';
import "../index.css";

export default function ResetPassword() {
  const { setToken } = useContext(UserTokenContext);
  let navigate = useNavigate();
  let [errMsg, setErrMsg] = useState("");
  let [successMsg, setSuccessMsg] = useState("");
  let [loading, setLoading] = useState(false);

  async function handleResetPassword(values) {
    setLoading(true);
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        {
          email: values.email,
          newPassword: values.newPassword
        }
      );
      if (data.token) {
        setSuccessMsg("Password reset successfully! Redirecting to login...");
        setErrMsg("");
        setToken(data.token);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
      setLoading(false);
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Failed to reset password. Please try again.");
      setSuccessMsg("");
      setLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is not valid"),
    newPassword: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][a-z0-9]{2,5}$/, "Password must start with uppercase letter and be 3-6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Please confirm your password"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  return (
    <div className="container">
      <h2 className="text-[1.5rem] font-bold my-3">Reset Password</h2>
      <p className="text-gray-600 mb-5">
        Enter your email and choose a new password for your account.
      </p>

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />

          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : (
            ""
          )}

          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            id="newPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />

          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.newPassword}</span>
            </div>
          ) : (
            ""
          )}

          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New Password
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            id="confirmPassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />

          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.confirmPassword}</span>
            </div>
          ) : (
            ""
          )}

          <label
            htmlFor="confirmPassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm Password
          </label>
        </div>

        {errMsg ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{errMsg}</span>
          </div>
        ) : (
          ""
        )}

        {successMsg ? (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">{successMsg}</span>
          </div>
        ) : (
          ""
        )}

        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {loading ? (
            <i className="fa-solid fa-spinner animate-spin text-white"></i>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
}
