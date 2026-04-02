import { useState } from "react";
import authService from "../services/authService";

export default function Signup({ onSignupSuccess, onClose, onSwitchToLogin }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    setIsLoading(true);
    setMessage("Creating account...");

    try {
      const result = await authService.register(
        form.username,
        form.email,
        form.password
      );

      if (result.success) {
        setMessage("✅ " + result.message);
        setForm({ username: "", email: "", password: "" });

        if (onSignupSuccess) {
          setTimeout(() => {
            onSignupSuccess({
              user: result.user,
              token: result.token,
            });
            onClose && onClose();
          }, 800);
        }
      } else {
        setMessage("❌ " + result.message);
      }
    } catch (err) {
      console.error("Registration error:", err);
      setMessage("❌ Error signing up");
    } finally {
      setIsLoading(false);
    }
  };

  const isSuccess = message.includes("✅");

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-200 px-8 pt-8 pb-6 relative">
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
        >
          ×
        </button>
      )}

      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <img
            src="/premier_products_logo_new.svg"
            alt="Premier Products Logo"
            className="h-10 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          Create Account
        </h2>
        <p className="text-sm text-gray-500">Join Premier Products today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 mb-4">
        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            name="username"
            placeholder="Enter your full name"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2.5 rounded-lg border-2 border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none text-sm sm:text-base"
          />
        </div>

        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2.5 rounded-lg border-2 border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none text-sm sm:text-base"
          />
        </div>

        <div className="text-left">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Create a password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2.5 rounded-lg border-2 border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none text-sm sm:text-base"
          />
          <p className="mt-1 text-xs text-gray-500">
            Must be at least 6 characters long
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all"
        >
          {isLoading && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      {message && (
        <div
          className={`mb-4 rounded-lg px-3 py-2 text-sm font-medium border ${
            isSuccess
              ? "bg-green-50 text-green-800 border-green-200"
              : "bg-red-50 text-red-700 border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      <div className="pt-4 border-t border-gray-200 text-center text-sm">
        <p className="text-gray-500 mb-2">Already have an account?</p>
        <button
          type="button"
          onClick={() => {
            onClose && onClose();
            onSwitchToLogin && onSwitchToLogin();
          }}
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-md text-green-600 font-semibold hover:bg-green-50 transition-colors"
        >
          Sign In Here →
        </button>
      </div>
    </div>
  );
}
