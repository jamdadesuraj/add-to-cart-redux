import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Cart from "./components/Cart";
import { Routes, Route } from "react-router-dom";
import CardDetails from "./components/CardDetails";
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/cart/:id" element={<CardDetails />} />
      </Routes>
    </>
  );
};

export default App;
