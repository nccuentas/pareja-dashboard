import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import useStreak from "../hooks/useStreak";

export default function Home() {
  const nav = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) {
      nav("/");
    }
  }, [user, nav]);

  if (!user) return null;

  const displayName = user === "nicolas" ? "Nicolas" : "Kely";

  // ✅ racha
  const streak = useStreak(user);

  return (
    <div className="screen home-screen">
      {/* HEADER */}
      <header className={`home-header home-header-${user}`}>
        <h1>Hola, {displayName}</h1>
        <strong>Gracias por darte un momento para revisar cómo te sientes, te amo.</strong>
      </header>

      {/* RACHA */}
      <div className="streak-box">
        {streak === null && <span>⏳ Calculando racha…</span>}

        {streak === 0 && (
          <span>🧊 Sin racha activa — empieza hoy</span>
        )}

        {streak === 1 && (
          <span>🔥 1 día seguido</span>
        )}

        {streak > 1 && (
          <span>🔥 {streak} días seguidos</span>
        )}
      </div>

      {/* CONTENIDO */}
      <main className="home-main">
        <section className="home-card">
          <button
            className="btn-primary full-width"
            onClick={() => nav("/daily")}
          >
             Hacer check-in de hoy
          </button>

          <button
            className="btn-secondary full-width"
            onClick={() => nav("/weekly")}
          >
             Ver resumen de la semana
          </button>
        </section>

        <button
          className="btn-text subtle"
          onClick={() => nav("/")}
        >
          Cambiar de persona
        </button>
      </main>
    </div>
  );
}
