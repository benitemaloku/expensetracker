import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, { email });
      setMessage(res.data.message);
      setEmail(""); 
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Forgot Password</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Enter your email to receive a reset link
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
          />

          {error && <p className="text-red-500 text-xs">{error}</p>}
          {message && <p className="text-green-500 text-xs">{message}</p>}

          <button 
            type="submit" 
            className={`btn-primary mt-3 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
