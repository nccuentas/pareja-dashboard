// utils/dates.js

// ✅ YA EXISTENTE – NO SE TOCA
export function getWeekRangeLabel() {
  const now = new Date();
  const end = new Date(now);
  const start = new Date(now);
  start.setDate(start.getDate() - 6);

  const fmt = (d) =>
    d.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "short",
    });

  return `${fmt(start)} - ${fmt(end)}`;
}

/* ======================================================
   ✅ NUEVO — MANEJO DE FECHAS CORREGIDO (COLOMBIA)
====================================================== */

// Devuelve HOY en Colombia como YYYY-MM-DD
export function getTodayColombia() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// Formatea un YYYY-MM-DD para mostrarlo bonito
export function formatColombiaDate(dateStr) {
  if (!dateStr) return "Fecha desconocida";

  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return "Fecha desconocida";

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day)
  );

  return date.toLocaleDateString("es-CO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
