import { useNavigate } from "react-router-dom";
import "../styles/selectUser.css";

export default function SelectUser() {
  const nav = useNavigate();

  const pickUser = (user) => {
    localStorage.setItem("user", user);
    nav("/home");
  };

  return (
    <div className="select-user-screen">
      <h1 className="select-title">¿Quién eres hoy?</h1>

      <div className="user-cards">
        <button
          className="user-card nicolas"
          onClick={() => pickUser("nicolas")}
        >
          <div className="avatar">🐟</div>
          <span>Nicolás</span>
        </button>

        <button
          className="user-card kely"
          onClick={() => pickUser("kely")}
        >
          <div className="avatar">🐠</div>
          <span>Kely</span>
        </button>
      </div>
    </div>
  );
}
