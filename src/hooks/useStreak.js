import { useEffect, useState } from "react";
import axios from "axios";

export default function useStreak(user) {
  const [streak, setStreak] = useState(null);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`https://pareja-backend-cjau.onrender.com/api/status/streak/${user}`)
      .then(res => setStreak(res.data.streak))
      .catch(() => setStreak(0));
  }, [user]);

  return streak;
}
