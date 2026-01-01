import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup";
import "../index.css";

export default function VerifyCode() {
  let navigate = useNavigate();
  let [errMsg, setErrMsg] = useState("");
  let [successMsg, setSuccessMsg] = useState("");
  let [loading, setLoading] = useState(false);
  let [resendLoading, setResendLoading] = useState(false);
  let [resendMsg, setResendMsg] = useState("");

  async function handleVerifyCode(values) {
    setLoading(true);
    setResendMsg("");
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        values
      );
      if (data.status === "Success") {
        setSuccessMsg("Code verified successfully! Redirecting...");
        setErrMsg("");
        setTimeout(() => {
          navigate("/reset-password");
        }, 1500);
      }
      setLoading(false);
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Invalid or expired code. Please try again.");
      setSuccessMsg("");
      setLoading(false);
    }
  }

  async function handleResendCode() {
    // Get email from localStorage if available
    const email = localStorage.getItem('resetEmail');
    if (!email) {
      setErrMsg("Email not found. Please restart the password reset process.");
      return;
    }

    setResendLoading(true);
    setResendMsg("");
    setErrMsg("");
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        { email }
      );
      if (data.statusMsg === "success") {
        setResendMsg("New verification code sent to your email!");
        formik.setFieldValue('resetCode', '');
        setErrMsg('');
      }
      setResendLoading(false);
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Failed to resend code. Please try again.");
      setResendLoading(false);
    }
  }

  let validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .required("Verification code is required")
      .matches(/^[0-9]{6}$/, "Code must be 6 digits"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleVerifyCode,
  });

  return (
    <div className="container">
      <h2 className="text-[1.5rem] font-bold my-3">Verify Code</h2>
      <p className="text-gray-600 mb-5">
        Enter the 6-digit verification code sent to your email.
      </p>

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            type="text"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            id="resetCode"
            maxLength="6"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />

          {formik.errors.resetCode && formik.touched.resetCode ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formik.errors.resetCode}</span>
            </div>
          ) : (
            ""
          )}

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

          {resendMsg ? (
            <div
              className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
              role="alert"
            >
              <span className="font-medium">{resendMsg}</span>
            </div>
          ) : (
            ""
          )}

          <label
            htmlFor="resetCode"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Verification Code
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {loading ? (
              <i className="fa-solid fa-spinner animate-spin text-white"></i>
            ) : (
              "Verify Code"
            )}
          </button>

          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendLoading}
            className="text-green-700 bg-white border border-green-700 hover:bg-green-50 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:border-green-600 dark:text-green-600 dark:hover:bg-gray-800"
          >
            {resendLoading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              "Resend Code"
            )}
          </button>
        </div>

        <div className="mt-4">
          <Link 
            to="/forgot-password" 
            className="text-sm text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400"
          >
            ← Back to Forgot Password
          </Link>
        </div>
      </form>
    </div>
  );
}
