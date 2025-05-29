import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import "./Login.css";
import { jwtDecode } from "jwt-decode"; // ✅ dùng named import

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await loginUser(email, password);

      if (response.status === 200) {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Không tìm thấy token.");
        }

        const decoded = jwtDecode(token); // ✅ sửa tại đây
        if (decoded.role === "ADMIN") {
          navigate("/dashboard");
        } else {
          localStorage.removeItem("token");
          setErrorMsg("Tài khoản không có quyền truy cập.");
        }
      }
    } catch (error) {
      if (!errorMsg) setErrorMsg("Email hoặc mật khẩu không đúng.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Nhập email"
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Nhập mật khẩu"
          />
        </div>

        <button type="submit" className="btn-submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
};

export default Login;
