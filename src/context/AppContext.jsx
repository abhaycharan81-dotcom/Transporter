import React, { createContext, useEffect, useState, useRef } from "react";
import { doc, serverTimestamp, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const AppContext = createContext();

const FIRESTORE_DOC = doc(db, "user_input", "2MYigROoYRIr7bvpECOC");

const loadAppState = () => {
  try {
    const saved = window.localStorage.getItem("transporterAppState");
    if (!saved) return { user: null, orders: [], bids: [] };
    return JSON.parse(saved);
  } catch {
    return { user: null, orders: [], bids: [] };
  }
};

export const AppProvider = ({ children }) => {
  const initialState = typeof window !== "undefined" ? loadAppState() : { user: null, orders: [], bids: [] };
  const [user, setUser] = useState(initialState.user);
  const [orders, setOrders] = useState(initialState.orders);
  const [bids, setBids] = useState(initialState.bids);
  const [initialized, setInitialized] = useState(false);
  const firstSaveRef = useRef(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("transporterAppState", JSON.stringify({ user, orders, bids }));
    }
  }, [user, orders, bids]);

  // Initialize from Firestore on first load to avoid overwriting remote state
  useEffect(() => {
    const initFromFirestore = async () => {
      if (typeof window === "undefined") return;
      try {
        const snap = await getDoc(FIRESTORE_DOC);
        if (snap.exists()) {
          const data = snap.data();
          setUser(data.user ?? initialState.user);
          setOrders(data.orders ?? initialState.orders);
          setBids(data.bids ?? initialState.bids);
          // persist to localStorage so both are in sync
          window.localStorage.setItem(
            "transporterAppState",
            JSON.stringify({ user: data.user ?? null, orders: data.orders ?? [], bids: data.bids ?? [] })
          );
        }
      } catch (error) {
        console.error("Failed to load app state from Firestore:", error);
      } finally {
        setInitialized(true);
      }
    };
    initFromFirestore();
  }, []);

  // Save to Firestore when state changes, but skip the first automatic save
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!initialized) return;
    if (firstSaveRef.current) {
      firstSaveRef.current = false;
      return;
    }

    const saveAppStateToFirestore = async () => {
      try {
        await setDoc(
          FIRESTORE_DOC,
          {
            user,
            orders,
            bids,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      } catch (error) {
        console.error("Failed to save app state to Firestore:", error);
      }
    };

    saveAppStateToFirestore();
  }, [user, orders, bids, initialized]);

  const updateOrder = (updatedOrder) => {
    setOrders((prev) => prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)));
  };

  return (
    <AppContext.Provider value={{ user, setUser, orders, setOrders, bids, setBids, updateOrder }}>
      {children}
    </AppContext.Provider>
  );
};
