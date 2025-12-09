import { useNavigate } from "react-router-dom";
import useWeeklyReview from "../hooks/useWeeklyReview";
import useTodayStatus from "../hooks/useTodayStatus";
import { getWeekRangeLabel } from "../utils/dates";
import ChartBar from "../components/ChartBar";

/* =========================
   HELPERS
========================= */

function checkInBadge(done) {
  if (done === undefined)
    return { text: "⏱️ Verificando check-in de hoy...", color: "#94a3b8" };

  return done
    ? { text: "✅ Check-in hecho hoy", color: "#4ade80" }
    : { text: "⏳ Aún no ha hecho check-in hoy", color: "#facc15" };
}

function formatDate(dateStr) {
  if (!dateStr) return "Fecha desconocida";

  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return "Fecha desconocida";

  // ajuste por zona horaria (ya validado por ti ✅)
  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day) - 1
  );

  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* =========================
   NOTAS
========================= */

function LiteralNotes({ notes }) {
  if (!notes || notes.length === 0) {
    return (
      <p className="review-empty" style={{ marginTop: "0.4rem" }}>
        No hubo notas escritas esta semana.
      </p>
    );
  }

  return (
    <ul style={{ marginTop: "0.6rem", paddingLeft: "1.2rem" }}>
      {notes.map((n, i) => (
<li key={i} className="notes-list">
  <div className="notes-date">{formatDate(n.date)}</div>
  <div>{n.note}</div>
</li>
      ))}
    </ul>
  );
}


function PersonalReview({ name, colorClass, data, checkedToday }) {
  const badge = checkInBadge(checkedToday);

  if (!data || !data.percentages) {
    return (
      <section className="review-section">
        <h2 className={colorClass}>{name}</h2>
        const badge = checkInBadge(checkedToday);

const badgeClass =
  checkedToday === undefined
    ? "checkin-loading"
    : checkedToday
    ? "checkin-done"
    : "checkin-pending";

<p className={`checkin-badge ${badgeClass}`}>
  {badge.text}
</p>
        <p className="review-empty">
          Aún no hay suficientes respuestas esta semana.
        </p>
      </section>
    );
  }

  return (
    <section className="review-section">
      <h2 className={colorClass}>{name}</h2>

      {/* ✅ CHECK-IN HOY */}
      <p
        style={{
          marginTop: "0.3rem",
          marginBottom: "0.6rem",
          fontSize: "0.9rem",
          fontWeight: 500,
          color: badge.color,
        }}
      >
        {badge.text}
      </p>

      <ChartBar
        label="Sentimientos"
        value={data.percentages.feelings}
        colorClass={colorClass}
      />
      <ChartBar
        label="Comunicación"
        value={data.percentages.communication}
        colorClass={colorClass}
      />
      <ChartBar
        label="Confianza"
        value={data.percentages.trust}
        colorClass={colorClass}
      />

      {/* TEXTO INTERPRETADO */}
      <ul className="review-list">
        {data.text.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>

      {/* NOTAS */}
      <div style={{ marginTop: "0.8rem" }}>
        <h4>Notas escritas</h4>
        <LiteralNotes notes={data.notes} />
      </div>
    </section>
  );
}

/* =========================
   MAIN
========================= */

export default function WeeklyReview() {
  const nav = useNavigate();
  const { data, loading, error } = useWeeklyReview();
  const todayStatus = useTodayStatus();
  const rangeLabel = getWeekRangeLabel();

  return (
    <div className="screen review-screen">
      {/* HEADER */}
      <header className="review-header">
        <h1>Resumen de la semana</h1>
        <p>{rangeLabel}</p>
      </header>

      {/* CONTENIDO */}
      <main className="review-main">
        {loading && <p>Cargando resumen...</p>}

        {error && (
          <p className="error-text">
            No se pudo cargar el resumen semanal.
          </p>
        )}

        {!loading && !error && data?.message && (
          <p className="review-empty">{data.message}</p>
        )}

        {!loading && !error && data && !data.message && (
          <>
            <PersonalReview
              name="Nicolás"
              colorClass="chart-nicolas"
              data={data.nicolas}
              checkedToday={todayStatus?.nicolas}
            />

            <PersonalReview
              name="Kely"
              colorClass="chart-kely"
              data={data.kely}
              checkedToday={todayStatus?.kely}
            />

            <section className="review-section">
              <h2>Recomendación general</h2>
              <p className="review-suggestion">
                {data.suggestion ||
                  "Usen este espacio como punto de partida para conversar con calma y respeto."}
              </p>
            </section>
          </>
        )}
      </main>

      {/* FOOTER */}
      <footer className="review-footer">
        <button
          className="btn-secondary full-width"
          onClick={() => nav("/home")}
        >
          Volver al inicio
        </button>

        <button
          className="btn-text full-width"
          onClick={() => nav("/")}
        >
          Cambiar de persona
        </button>
      </footer>
    </div>
  );
}
