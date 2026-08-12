import React, { createContext, useEffect, useState } from "react";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("transporterAppState", JSON.stringify({ user, orders, bids }));
    }
  }, [user, orders, bids]);

  useEffect(() => {
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

    if (typeof window !== "undefined") {
      saveAppStateToFirestore();
    }
  }, [user, orders, bids]);

  const updateOrder = (updatedOrder) => {
    setOrders((prev) => prev.map((order) => (order.id === updatedOrder.id ? updatedOrder : order)));
  };

  return (
    <AppContext.Provider value={{ user, setUser, orders, setOrders, bids, setBids, updateOrder }}>
      {children}
    </AppContext.Provider>
  );
};
