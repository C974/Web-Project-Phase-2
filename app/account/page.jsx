"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

const Account = () => {
  const [loginFrom, setLoginFrom] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
    balance: 0,
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
      balance: registerData.type === "buyer" ? 2000 : 0,
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) =>
        user.email === loginData.email && user.password === loginData.password
    );

    if (user) {
      let userType = "";
      if (user.type === "admin") {
        userType = "admin";
      } else if (user.type === "seller") {
        userType = "seller";
      } else {
        userType = "buyer";
      }

      // Store user type in local storage
      localStorage.setItem("userType", userType);
      localStorage.setItem("userMail", user.email);

      window.location.href = "/";
    } else {
      toast.error(" Incorrect credentials, Check the Email and Password", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
      });
    }
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
        if (registerData) {
          let userType = "";
          if (registerData.type === "admin") {
            userType = "admin";
          } else if (registerData.type === "seller") {
            userType = "seller";
          } else {
            userType = "buyer";
          }
          localStorage.setItem("userType", userType);

          localStorage.setItem("userMail", registerData.email);
        }
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add user");
    }
  };
  return (
    <>
      <Navbar />
      <div className="account-page">
        <div className="container">
          <div className="row">
            {/* <!-- <div className="col-2">
                        <img src="images/logo.png" width="100%">
                    </div> --> */}
            <div className="col-2">
              <div className="form-container">
                <div className="form-btn ">
                  <span onClick={() => setLoginFrom(true)}>Login</span>
                  <span onClick={() => setLoginFrom(false)}>Register</span>
                  <hr
                    id="Indicator"
                    className={`${
                      loginFrom ? "translate-x-0" : "translate-x-[100px]"
                    }`}
                  />
                </div>
                {loginFrom ? (
                  <form>
                    <input
                      type="email"
                      placeholder="email"
                      id="email"
                      name="email"
                      onChange={handleLoginChange}
                    />
                    <input
                      type="password"
                      placeholder="password"
                      id="password"
                      name="password"
                      onChange={handleLoginChange}
                    />
                    <button
                      type="submit"
                      className="btn"
                      onClick={handleLoginSubmit}
                    >
                      Login
                    </button>
                    <Link href="">Forgot password</Link>
                  </form>
                ) : (
                  <form>
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
                      className="w-full p-2 rounded-[10px] border border-[#ccc] text-gray-500"
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
                    <button
                      type="submit"
                      className="btn"
                      onClick={handleRegisterSubmit}
                    >
                      Register
                    </button>
                  </form>
                )}
                <p
                  id="errorMessage"
                  style={{ color: "red", display: "none" }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default Account;
