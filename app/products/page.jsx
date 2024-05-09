/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../common/Footer";
import Navbar from "../common/Navbar";

const Products = () => {
  const userType = localStorage.getItem("userType");

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  console.log(products);
  return (
    <>
      <Navbar />
      <h2 className="text-4xl text-center capitalize py-8">Product list</h2>
      <div className="small-container grid grid-cols-3  gap-6 pb-6">
        {products.map((product, index) => (
          <Link
            key={index}
            href={
              userType === "buyer"
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
      <Footer />
    </>
  );
};

export default Products;
