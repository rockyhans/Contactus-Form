import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="homeDiv">
      <div>
        <h1>WELCOME !</h1>
      </div>
      <div style={{ textAlign: "center" }}>
        <button
          className="btn btn-success"
          onClick={() => navigate("/contact")}
        >
          Contact us
        </button>
      </div>
    </div>
  );
}

export default Home;
