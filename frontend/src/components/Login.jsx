import { useState } from "react";
import axios from "axios";

export default function Login({ onLoginSuccess, onClose, onSwitchToSignup }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isLoading) {
      console.log("⚠️ Already submitting, ignoring duplicate request");
      return;
    }
    
    setIsLoading(true);
    setMessage("Logging in...");
    
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", form);
      console.log("✅ Login response:", res.data);
      
      if (res.data.success) {
        setMessage("✅ Login successful!");
        setForm({ email: "", password: "" });
        
        // Store token
        if (res.data.token) {
          localStorage.setItem('token', res.data.token);
          console.log("🔑 Token saved:", res.data.token);
        }

        // Call success callback to update parent state and redirect
        if (onLoginSuccess) {
          setTimeout(() => {
            onLoginSuccess({
              user: res.data.user,
              token: res.data.token
            });
            onClose && onClose(); // Close modal/form
          }, 1500); // Show success message briefly before redirecting
        }
      } else {
        setMessage("❌ Login failed");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      // More robust: show alert for any 4xx error or message containing 'incorrect'/'invalid'
      const status = err.response?.status;
      const errorMsg = err.response?.data?.message?.toLowerCase() || "";
      if (
        (status >= 400 && status <= 403) ||
        errorMsg.includes("incorrect") ||
        errorMsg.includes("invalid")
      ) {
        setMessage("❌ Incorrect username or password");
      } else {
        setMessage("❌ " + (err.response?.data?.message || "Error logging in"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center",
        border: "1px solid #e2e8f0",
        position: "relative"
      }}>
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              background: "none",
              border: "none",
              fontSize: "24px",
              color: "#9ca3af",
              cursor: "pointer",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#f3f4f6";
              e.target.style.color = "#374151";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#9ca3af";
            }}
          >
            ×
          </button>
        )}
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ 
            color: "#1a202c", 
            marginBottom: "8px", 
            fontSize: "28px",
            fontWeight: "700"
          }}>
            Welcome Back
          </h2>
          <p style={{ 
            color: "#64748b", 
            fontSize: "16px",
            margin: "0"
          }}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontSize: "14px", 
              fontWeight: "600",
              color: "#374151"
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                fontSize: "16px"
              }}
            />
          </div>

          <div style={{ marginBottom: "24px", textAlign: "left" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontSize: "14px", 
              fontWeight: "600",
              color: "#374151"
            }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                fontSize: "16px"
              }}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              ...buttonStyle,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              fontSize: "16px",
              fontWeight: "600",
              transform: isLoading ? 'none' : 'translateY(0)',
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.2)';
              }
            }}
          >
            {isLoading ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ 
                  display: "inline-block", 
                  width: "20px", 
                  height: "20px", 
                  border: "2px solid #ffffff", 
                  borderTop: "2px solid transparent", 
                  borderRadius: "50%", 
                  animation: "spin 1s linear infinite",
                  marginRight: "8px"
                }}></span>
                Signing In...
              </span>
            ) : "Sign In"}
          </button>
        </form>

        {message && (
          <div style={{ 
            marginBottom: "20px",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "500",
            backgroundColor: message.includes("✅") ? "#f0f9ff" : "#fef2f2",
            color: message.includes("✅") ? "#0369a1" : "#dc2626",
            border: `1px solid ${message.includes("✅") ? "#bae6fd" : "#fecaca"}`
          }}>
            {message}
          </div>
        )}

        <div style={{ 
          paddingTop: "20px", 
          borderTop: "1px solid #e2e8f0",
          fontSize: "14px"
        }}>
          <p style={{ 
            color: "#64748b", 
            margin: "0 0 12px 0"
          }}>
            Don't have an account?
          </p>
          <button 
            onClick={() => {
              onClose && onClose();
              onSwitchToSignup && onSwitchToSignup();
            }}
            style={{
              background: "none",
              border: "none",
              color: "#3b82f6",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "6px",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#eff6ff";
              e.target.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.textDecoration = "none";
            }}
          >
            Create Account Here →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  marginBottom: "0",
  border: "2px solid #e2e8f0",
  borderRadius: "8px",
  fontSize: "16px",
  transition: "all 0.2s ease",
  outline: "none",
  backgroundColor: "#ffffff"
};

// Add focus styles programmatically
const inputFocusStyle = {
  borderColor: "#3b82f6",
  boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)"
};

const buttonStyle = {
  width: "100%",
  padding: "14px 24px",
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "600",
  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
  transition: "all 0.2s ease"
};
