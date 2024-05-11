"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

const AddBuyer = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    type: "buyer",
    balance: 0,
  });

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
      balance: registerData.type === "buyer" ? 2000 : 0,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        toast.success("Product added successfully!!!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.location.href = "/statistics";
      }
    } catch (error) {
      console.error("Error adding Buyer:", error);
      alert("Failed to add Buyer");
    }
  };

  return (
    <>
      <Navbar />
      <form className="w-[30%] mx-auto shadow-2xl p-6 my-6 rounded-2xl">
        <input
          type="text"
          placeholder="username"
          name="name"
          onChange={handleRegisterChange}
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleRegisterChange}
        />
        <select
          name="type"
          onChange={handleRegisterChange}
          defaultValue={registerData.type}
          className="w-full p-2 rounded-[10px] border border-[#ccc] text-gray-500 pointer-events-none"
        >
          <option value="">Select an type</option>
          <option value="seller">Seller</option>
          <option value="buyer">Buyer</option>
          <option value="admin">Admin</option>
        </select>
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleRegisterChange}
        />
        <button type="submit" className="btn" onClick={handleRegisterSubmit}>
          Register
        </button>
      </form>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default AddBuyer;
