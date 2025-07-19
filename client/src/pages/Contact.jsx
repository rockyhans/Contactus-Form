import { useState, useEffect } from "react";
import axios from "axios";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    address: "",
    description: "",
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");

  // Check if user is authenticated
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/verify", { withCredentials: true })
      .then((res) => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setMessage("Please register or log in to submit the contact form.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/contact", form, {
        withCredentials: true,
      });
      setMessage("Form submitted successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        college: "",
        address: "",
        description: "",
      });
    } catch (err) {
      setMessage("Submission failed.");
    }
  };

  return (
    <div className="contactPage">
      <div className="contactPage1 mt-5">
        <h2>Contact Form</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            required
            value={form.name}
            className="form-control"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Email"
            required
            value={form.email}
            className="form-control"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            placeholder="Phone"
            required
            value={form.phone}
            className="form-control"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            placeholder="College"
            required
            value={form.college}
            className="form-control"
            onChange={(e) => setForm({ ...form, college: e.target.value })}
          />
          <input
            placeholder="Address"
            required
            value={form.address}
            className="form-control"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <textarea
            placeholder="Description"
            required
            value={form.description}
            className="form-control"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button
            className="btn btn-success"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
