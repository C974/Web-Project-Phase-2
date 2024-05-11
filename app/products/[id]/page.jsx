/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import Footer from "@/app/common/Footer";
import Navbar from "@/app/common/Navbar";
import { useEffect, useState } from "react";

const ProductDetails = ({ params }) => {
  const productName = decodeURIComponent(params.id);

  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    fetch(`/api/products/${productName}`)
      .then((response) => response.json())
      .then((data) => setFilteredProduct(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <>
      <Navbar />
      <div className="small-container single-product">
        <div></div>
        <div className="row">
          <div className="col-2">
            <div id="productImg" className="pb-4">
              <img src={filteredProduct[0]?.productImg} alt="" />
            </div>
            <div className="small-img-row">
              <div className="small-img-col">
                <img
                  src="/images/dmitry-novikov-49gi04Retc4-unsplash.jpg"
                  width="100%"
                  className="small-img"
                />
              </div>
              <div className="small-img-col">
                <img
                  src="/images/dmitry-novikov-Y1BCrRUK26Y-unsplash.jpg"
                  width="100%"
                  className="small-img"
                />
              </div>
              <div className="small-img-col">
                <img
                  src="/images/roberto-nickson-Ddjl0Cicdr4-unsplash.jpg"
                  width="100%"
                  className="small-img"
                />
              </div>
              <div className="small-img-col">
                <img
                  src="/images/taras-chernus-9uM2WBpum3M-unsplash.jpg"
                  width="100%"
                  className="small-img"
                />
              </div>
            </div>
          </div>

          <div className="col-2">
            <p id="productBreName">
              avialable: {filteredProduct[0]?.productQuantity}
            </p>
            <p id="productBreName">
              home/products/{filteredProduct[0]?.productName}
            </p>
            <h1 id="productName">{filteredProduct[0]?.productName}</h1>
            <h4 id="productPrice">${filteredProduct[0]?.productPrice}</h4>
            <select>
              <option>Select Color</option>
              <option>Midnight Silver Metallic</option>
              <option>Pearl White Multi-Coat</option>
              <option>Deep Blue Metallic</option>
            </select>
            <input type="number" values="1" />
            <button
              className="btn"
              onClick={() =>
                (window.location.href = `/purchase/${filteredProduct[0]?.productName}`)
              }
            >
              Add to Cart
            </button>
            <h3>
              Product Details <i className="fa fa-indent"></i>
            </h3>
            <br />
            <p id="productDesc">{filteredProduct[0]?.productDesc}</p>
            <p className="text-lg mt-2">
              <b>seller Email: </b>
              {filteredProduct[0]?.sellerEmail}
            </p>
          </div>
        </div>
      </div>
      ;
      <Footer />
    </>
  );
};

export default ProductDetails;
