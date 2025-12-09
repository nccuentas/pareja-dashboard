import { useEffect, useState } from "react";
import axios from "axios";

export default function useTodayStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    axios
      .get("https://pareja-backend-cjau.onrender.com/api/status/today")
      .then((res) => {
        setStatus(res.data);
      })
      .catch((err) => {
        console.error("Error fetching today status", err);
      });
  }, []);

  return status;
}
