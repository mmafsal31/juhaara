import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { pushNotification } from "../redux/store.js";

export default function useRealtimeNotifications() {
  const dispatch = useDispatch();

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws/notifications/";
    let socket;
    try {
      socket = new WebSocket(wsUrl);
      socket.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        dispatch(pushNotification(payload.message));
      };
    } catch {
      const interval = setInterval(() => {
        dispatch(pushNotification(`Live sales update: ₹${Math.floor(5000 + Math.random() * 9000).toLocaleString("en-IN")} added`));
      }, 18000);
      return () => clearInterval(interval);
    }
    return () => socket?.close();
  }, [dispatch]);
}

