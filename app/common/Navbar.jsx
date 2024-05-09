"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { BsBoxArrowLeft, BsList, BsPlusCircle, BsSearch } from "react-icons/bs";
import { FaCaretDown, FaCartArrowDown, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [userType, setUserType] = useState(null);
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);
  const logOut = () => {
    localStorage.removeItem("userType");

    window.location.href = "/account";
    setUserType(null);
  };

  const buyer = userType === "buyer";
  const seller = userType === "seller";
  const admin = userType === "admin";

  useEffect(() => {
    if (buyer) {
      const currentBuyer = localStorage.getItem("userMail");
      fetch(`/api/users/buyer/${currentBuyer}`)
        .then((response) => response.json())
        .then((data) => setCurrentBalance(data.balance))
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [buyer]);
  return (
    <div className="header">
      <div className="container">
        <div className="navbar">
          <div className="logo">
            <Link href="/">
              <img src="/images/logo.png" width="125px" />
            </Link>
          </div>
          <nav>
            <ul id="MenuItems">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>

              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                {admin ? (
                  <Link href="/statistics">Statistics</Link>
                ) : (
                  <Link href="/account">Account</Link>
                )}
              </li>
              <li className="search">
                <input type="text" placeholder="Search" />
                <button type="submit">
                  <BsSearch size={15} />
                </button>
              </li>
            </ul>
          </nav>
          <div className="mobile-link">
            {buyer && (
              <Link href="/products/myorder">
                <img src="/images/cart.png" width="30px" height="30px" />
                <span id="moneyBalance">${currentBalance}</span>
              </Link>
            )}
            <div className="mobile-menu">
              <img
                src="/images/menu.png"
                className="menu-icon"
                onClick="toggleMenu()"
                alt="Menu Icon"
              />
              <ul className="dropdown-menu" id="dropdownMenu">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/products">Products</Link>
                </li>
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/account">Account</Link>
                </li>
                <li className="search">
                  <input type="text" placeholder="Search" />
                  <button type="submit">
                    <BsSearch />
                  </button>
                </li>
              </ul>
            </div>
            <div
              className={`dropdown `}
              id="profileContainer"
              style={{ display: `${userType ? "block" : "none"}` }}
            >
              <button className="dropdown-btn logout__btn">
                <FaUserCircle size={30} />
              </button>
              <div className="dropdown-menu">
                <div style={{ display: `${buyer ? "block" : "none"}` }}>
                  {/* <!-- Your menu items here --> */}
                  <Link href="/products/myorder">
                    <div className="dropdown-menu-list">
                      <FaCartArrowDown
                        style={{ display: "inline", marginRight: "10px" }}
                      />
                      <span>My Orders</span>
                    </div>
                  </Link>
                </div>
                <div style={{ display: `${seller ? "block" : "none"}` }}>
                  {/* <!-- Your menu items here --> */}
                  <Link href="/products/saleshistory">
                    <div className="dropdown-menu-list">
                      <FaCaretDown
                        style={{ display: "inline", marginRight: "10px" }}
                      />
                      <span>Sales History</span>
                    </div>
                  </Link>
                  <Link href="/products">
                    <div className="dropdown-menu-list">
                      <BsList
                        style={{ display: "inline", marginRight: "10px" }}
                      />
                      <span>View items</span>
                    </div>
                  </Link>
                  <Link href="/addproduct">
                    <div className="dropdown-menu-list">
                      <BsPlusCircle
                        style={{ display: "inline", marginRight: "10px" }}
                      />
                      <span>Add Product</span>
                    </div>
                  </Link>
                </div>
                <div className="dropdown-menu-list" onClick={logOut}>
                  <BsBoxArrowLeft
                    style={{ display: "inline", marginRight: "10px" }}
                  />
                  <span>Log Out</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
