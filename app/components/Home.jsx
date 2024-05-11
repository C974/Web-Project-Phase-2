/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    fetch(`/api/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  return (
    <main>
      <div className="row">
        <div className="col-2">
          <h1>
            Drive the future
            <br />
            Choose Tesla!
          </h1>
          <p>
            Experience unparalleled innovation and sustainability with Tesla,
            revolutionizing transportation for a brighter, greener future.
          </p>
          <Link href="/products" className="btn">
            Explore Now &#8594;
          </Link>
        </div>
        <div className="col-2">
          <img src="/images/dmitry-novikov-49gi04Retc4-unsplash.jpg" />
        </div>
      </div>
      <div className="small-container">
        <h2 className="title">Featured Products</h2>
        <div className="small-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6 pb-6">
          {products.slice(0, 3).map((product, index) => (
            <Link
              key={index}
              href={
                userType === null
                  ? `/account`
                  : userType === "buyer"
                  ? `/products/${product.productName}`
                  : `/updateproduct/${product.productName}`
              }
              className=" shadow-xl p-4 rounded-2xl"
            >
              <div>
                <div>
                  <img src={product.productImg} alt="" height={300} />
                </div>
                <h3 className="text-2xl text-center capitalize text-black font-medium mt-3">
                  {product.productName}
                </h3>
                <h3 className="text-lg text-center capitalize">
                  ${product.productPrice}
                </h3>
                <h3 className="text-lg text-center capitalize">
                  avialable: {product.productQuantity}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="offer">
        <div className="small-container">
          <div className="row">
            <div className="col-2">
              <img
                src="images/priscilla-du-preez-5hrySHGpawo-unsplash.jpg"
                className="offer-img"
              />
            </div>
            <div className="col-2">
              <p>Exclusively Available on Tesla</p>
              <h1>futuristic Mobility!</h1>
              <small>
                Embark on a thrilling journey with Tesla: Revolutionize your
                ride today!{" "}
              </small>
              <br />
              <Link href="/products" className="btn">
                Buy Now &#8594;
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="testimonial">
        <div className="small-container">
          <div className="row">
            <div className="col-3">
              <FaQuoteLeft />
              <p>
                You gotta check out the Full Self-Driving package for your
                Tesla. It's like having a personal chauffeur with features like
                Navigate on Autopilot and Autopark, making every drive a breeze.
              </p>
              <div className="rating" style={{ display: "flex", gap: "5px" }}>
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <img src="images/user-1.png" />
              <h3>Sean Parkar</h3>
            </div>
            <div className="col-3">
              <FaQuoteLeft />
              <p>
                rust me, schedule your charging for off-peak hours. Saves you
                money and ensures your Tesla's always juiced up and ready to
                roll whenever you need it.
              </p>
              <div className="rating" style={{ display: "flex", gap: "5px" }}>
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <img src="images/user-2.png" />
              <h3>Mike Smith</h3>
            </div>
            <div className="col-3">
              <FaQuoteLeft />
              <p>
                Oh, and don't forget about regenerative braking. It's like
                getting free energy every time you slow down, helping you go
                further while doing your part for the planet. Win-win
              </p>
              <div className="rating" style={{ display: "flex", gap: "5px" }}>
                {Array.from({ length: 5 }, (_, index) => (
                  <FaStar key={index} />
                ))}
              </div>
              <img src="images/user-3.png" />
              <h3>Mabel Joe</h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
