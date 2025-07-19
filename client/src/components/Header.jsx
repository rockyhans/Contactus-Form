import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div className="headerDiv p-3  ">
      <h2>Contact us Form</h2>
      <button
        className="ps-3 pe-3 p-2 btn btn-primary "
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
}

export default Header;
