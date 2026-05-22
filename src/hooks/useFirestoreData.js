import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

export function useRealTimeStats() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    bookings: 0,
    revenue: 0,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!auth.currentUser) {
      setStats((prev) => ({ ...prev, loading: false }));
      return;
    }

    try {
      // Subscribe to events collection
      const eventsRef = collection(db, "events");
      const q = query(eventsRef, where("userId", "==", auth.currentUser.uid));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          let totalEvents = snapshot.docs.length;
          let bookings = 0;
          let revenue = 0;

          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            bookings += data.bookings || 0;
            revenue += data.revenue || 0;
          });

          setStats({
            totalEvents,
            bookings,
            revenue,
            loading: false,
            error: null,
          });
        },
        (error) => {
          console.error("Error fetching stats:", error);
          setStats((prev) => ({
            ...prev,
            loading: false,
            error: error.message,
          }));
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error("Error setting up stats listener:", error);
      setStats((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  }, []);

  return stats;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!auth.currentUser) {
      setNotifications((prev) => ({ ...prev, loading: false }));
      return;
    }

    try {
      const notificationsRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "notifications"
      );
      const q = query(
        notificationsRef
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const notifs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setNotifications({
            data: notifs,
            loading: false,
            error: null,
          });
        },
        (error) => {
          console.error("Error fetching notifications:", error);
          setNotifications((prev) => ({
            ...prev,
            loading: false,
            error: error.message,
          }));
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error("Error setting up notifications listener:", error);
      setNotifications((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  }, []);

  return notifications;
}

export function useWeeklyAnalysis() {
  const [analysis, setAnalysis] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!auth.currentUser) {
      setAnalysis((prev) => ({ ...prev, loading: false }));
      return;
    }

    try {
      const analysisRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "weeklyAnalysis"
      );

      const unsubscribe = onSnapshot(
        analysisRef,
        (snapshot) => {
          // Get last 7 days of data
          const today = new Date();
          const last7Days = [];

          for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            last7Days.push({
              date: date.toISOString().split("T")[0],
              day: date.toLocaleDateString("en-US", { weekday: "short" }),
              events: 0,
              revenue: 0,
            });
          }

          snapshot.docs.forEach((doc) => {
            const data = doc.data();
            const dayData = last7Days.find((d) => d.date === data.date);
            if (dayData) {
              dayData.events = data.events || 0;
              dayData.revenue = data.revenue || 0;
            }
          });

          setAnalysis({
            data: last7Days,
            loading: false,
            error: null,
          });
        },
        (error) => {
          console.error("Error fetching weekly analysis:", error);
          setAnalysis((prev) => ({
            ...prev,
            loading: false,
            error: error.message,
          }));
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error("Error setting up analysis listener:", error);
      setAnalysis((prev) => ({
        ...prev,
        loading: false,
        error: error.message,
      }));
    }
  }, []);

  return analysis;
}
