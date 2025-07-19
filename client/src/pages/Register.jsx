import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form,
        {
          withCredentials: true,
        }
      );
      alert("Registered successfully!");
      navigate("/contact");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="ragisterPage mt-5 ">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="">
        <div>
          <label className="mb-2">Email:</label>
          <input
            type="email"
            value={form.email}
            className="form-control"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label className="mt-2">Password:</label>
          <input
            type="password"
            value={form.password}
            className="form-control"
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button className="btn btn-success mt-3 " type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
